import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization with proper telemetry header
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper to sanitize JSON response from Gemini
function safeParseJson(raw: string, fallback: any = null): any {
  try {
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse model JSON:', err, '\nRaw was:', raw);
    return fallback;
  }
}

// POST /api/analyze-gap
app.post('/api/analyze-gap', async (req: Request, res: Response) => {
  try {
    const {
      targetRole,
      targetLevel = 'Intern / Junior',
      customJobDescription,
      studentSkills = [],
      studentBackground = '',
      timelineWeeks = 8,
      hoursPerWeek = 10,
    } = req.body;

    if (!targetRole && !customJobDescription) {
      return res.status(400).json({ error: 'Target role or job description is required.' });
    }

    // If Gemini client is available, generate dynamic precision analysis
    if (aiClient) {
      const prompt = `You are an elite Tech Career Architect and Senior Engineering Hiring Manager at a top-tier tech firm.
Analyze this student's skill set against current industry demands for:
Target Role: "${targetRole || 'Software Engineer'}"
Experience Level: "${targetLevel}"
Available Timeline: ${timelineWeeks} weeks (${hoursPerWeek} hours/week available).

Student's Known Skills:
${JSON.stringify(studentSkills, null, 2)}

Student Background / Notes:
${studentBackground || 'Undergraduate student / self-taught learner seeking industry role.'}

${customJobDescription ? `Target Job Description to match against:\n"""\n${customJobDescription}\n"""` : 'Use current realistic 2026 industry standards for this role.'}

Provide a comprehensive, highly realistic skill gap analysis and step-by-step personalized learning roadmap.
Be rigorous: do not inflate scores. Distinguish between what students typically know (basic syntax, toy tutorials) vs what companies actually demand (system architecture, edge cases, testing, tooling, git workflows, production deployments).

Return ONLY valid JSON matching this schema:
{
  "overallMatchScore": number (0 to 100 integer representing actual job readiness),
  "summaryHeadline": "string (one punchy summary sentence on their readiness)",
  "executiveSummary": "string (2-3 sentences explaining their strongest strengths and biggest vulnerability in interviews)",
  "categoryScores": [
    { "category": "Core Fundamentals", "score": number (0-100), "feedback": "string" },
    { "category": "Frameworks & Tools", "score": number (0-100), "feedback": "string" },
    { "category": "Production & DevOps/Cloud", "score": number (0-100), "feedback": "string" },
    { "category": "Testing & Architecture", "score": number (0-100), "feedback": "string" }
  ],
  "matchedSkills": [
    {
      "name": "string",
      "category": "string",
      "studentProficiency": "Beginner | Intermediate | Advanced",
      "industryExpectation": "string",
      "statusNote": "string"
    }
  ],
  "missingSkills": [
    {
      "name": "string",
      "category": "string",
      "priority": "Dealbreaker" | "High" | "Advantage",
      "whyCompaniesDemand": "string",
      "estimatedHoursToLearn": number,
      "difficulty": "Easy" | "Medium" | "Challenging",
      "typicalInterviewTrap": "string"
    }
  ],
  "marketInsights": {
    "hiringDemandRating": "Very High | High | Moderate",
    "topDifferentiator": "string (what makes candidates stand out)",
    "commonStudentPitfall": "string (what 80% of student applicants do wrong)"
  },
  "roadmapPhases": [
    {
      "phaseNumber": number,
      "title": "string",
      "weekSpan": "Weeks 1-2",
      "theme": "string",
      "focusSkills": ["string"],
      "actionMilestones": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "estimatedHours": number,
          "handsOnDeliverable": "string",
          "recommendedResources": [
            { "name": "string", "type": "Documentation" | "Course" | "Hands-on Repo" | "Interactive", "tip": "string" }
          ],
          "interviewQuestion": "string",
          "keyAnswerTakeaway": "string"
        }
      ]
    }
  ],
  "recommendedCapstoneProject": {
    "title": "string",
    "tagline": "string",
    "description": "string",
    "mustHaveFeatures": ["string"],
    "skillsDemonstrated": ["string"]
  }
}`;

      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const text = response.text || '';
        const parsed = safeParseJson(text, null);
        if (parsed && typeof parsed.overallMatchScore === 'number') {
          return res.json({ success: true, data: parsed, source: 'gemini-3.8-flash' });
        }
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to rule engine:', geminiError);
      }
    }

    // High quality deterministic fallback calculation if API key is not present or failed
    const fallbackData = generateFallbackAnalysis(targetRole, targetLevel, studentSkills, timelineWeeks, hoursPerWeek);
    return res.json({ success: true, data: fallbackData, source: 'benchmark-engine' });
  } catch (err: any) {
    console.error('Error in /api/analyze-gap:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// POST /api/explain-skill
app.post('/api/explain-skill', async (req: Request, res: Response) => {
  try {
    const { skillName, targetRole = 'Software Engineer' } = req.body;
    if (!skillName) {
      return res.status(400).json({ error: 'skillName is required' });
    }

    if (aiClient) {
      const prompt = `You are a mentor explaining the technical skill "${skillName}" to a student aiming for a "${targetRole}" role.
Provide concise, highly actionable guidance in JSON:
{
  "skillName": "${skillName}",
  "oneLineSummary": "string (clear, jargon-free summary)",
  "whyRecruitersCare": "string (the practical business or engineering reason)",
  "mentalModel": "string (analogies or quick mental model)",
  "quickStartExercise": "string (a 30-minute mini task to understand it hands-on)",
  "weekendProjectIdea": "string (a tangible mini feature to build and commit to GitHub)",
  "top3InterviewQuestions": [
    { "q": "string", "conciseAnswer": "string" }
  ]
}`;
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = safeParseJson(response.text || '', null);
      if (parsed) {
        return res.json({ success: true, data: parsed });
      }
    }

    // Fallback response for offline / instant usage
    return res.json({
      success: true,
      data: {
        skillName,
        oneLineSummary: `${skillName} is a foundational industry requirement for modern ${targetRole} workflows.`,
        whyRecruitersCare: `Teams look for ${skillName} because it separates academic code from maintainable production codebases.`,
        mentalModel: `Think of ${skillName} as the contract between developer expectations and production runtime stability.`,
        quickStartExercise: `Initialize a clean repository and implement a minimal 50-line example using ${skillName}.`,
        weekendProjectIdea: `Add ${skillName} into your existing portfolio project to demonstrate practical integration.`,
        top3InterviewQuestions: [
          { q: `How does ${skillName} solve common problems in production?`, conciseAnswer: `It provides predictability, standardization, and prevents regression failures.` },
          { q: `What are the trade-offs of using ${skillName}?`, conciseAnswer: `Initial setup complexity and learning curve vs long-term maintainability.` },
          { q: `Can you walk through how you used ${skillName} in a project?`, conciseAnswer: `Explain the problem, implementation steps, and quantifiable outcome.` }
        ]
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to explain skill' });
  }
});

// POST /api/extract-skills-from-text
app.post('/api/extract-skills-from-text', async (req: Request, res: Response) => {
  try {
    const { text, type = 'resume' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (aiClient) {
      const prompt = `Extract all technical and domain skills from this ${type} text.
Assign an estimated level or priority.
Text:
"""${text.slice(0, 4000)}"""

Return ONLY JSON:
{
  "detectedRole": "string (e.g. Frontend Developer, Data Analyst)",
  "skills": [
    { "name": "string", "category": "Languages | Frameworks | Databases | Cloud & Tools | Concepts", "confidence": "High | Medium" }
  ]
}`;
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const parsed = safeParseJson(response.text || '', null);
      if (parsed) {
        return res.json({ success: true, data: parsed });
      }
    }

    // Fallback keyword extractor
    const keywords = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Python', 'Java',
      'C++', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'AWS', 'HTML', 'CSS',
      'Tailwind CSS', 'Next.js', 'REST API', 'GraphQL', 'Linux', 'Jest', 'CI/CD'
    ];
    const found = keywords
      .filter(k => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text))
      .map(name => ({ name, category: 'Technical Skills', confidence: 'High' }));

    return res.json({
      success: true,
      data: {
        detectedRole: 'Software Developer',
        skills: found.length > 0 ? found : [{ name: 'Git', category: 'Tools', confidence: 'Medium' }]
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Extraction failed' });
  }
});

// Fallback algorithm implementation
function generateFallbackAnalysis(
  targetRole: string,
  targetLevel: string,
  studentSkills: Array<{ name: string; level: string }>,
  timelineWeeks: number,
  hoursPerWeek: number
) {
  const normalizedKnown = new Set(studentSkills.map(s => s.name.toLowerCase().trim()));

  // Role templates
  const roleSkillMap: Record<string, {
    core: string[];
    frameworks: string[];
    production: string[];
    testing: string[];
  }> = {
    'Full-Stack Web Developer': {
      core: ['JavaScript', 'TypeScript', 'HTML/CSS', 'Data Structures', 'REST APIs'],
      frameworks: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
      production: ['Docker', 'Git/GitHub', 'Cloud Hosting (AWS/Vercel)', 'Redis/Caching'],
      testing: ['Unit Testing (Jest/Vitest)', 'End-to-End Testing', 'Database Indexing', 'API Security']
    },
    'AI & LLM Application Engineer': {
      core: ['Python', 'Data Structures', 'Linear Algebra & Statistics', 'API Integration'],
      frameworks: ['PyTorch', 'FastAPI', 'LangChain / LlamaIndex', 'Vector Databases (Pinecone/Chroma)'],
      production: ['Docker', 'Model Serving / Deployment', 'Prompt Engineering & Evaluation', 'Git/GitHub'],
      testing: ['RAG Pipeline Benchmarking', 'LLM Guardrails & Security', 'Data Cleaning & Preprocessing']
    },
    'Cloud & DevOps Engineer': {
      core: ['Linux Administration', 'Networking Fundamentals', 'Bash Scripting', 'Python/Go'],
      frameworks: ['Docker', 'Kubernetes', 'Terraform (IaC)', 'Ansible'],
      production: ['AWS / GCP Services', 'GitHub Actions / CI/CD', 'Prometheus & Grafana', 'Zero-Downtime Deploys'],
      testing: ['Infrastructure Testing', 'Security Hardening', 'Disaster Recovery Simulation']
    },
    'Data Analyst': {
      core: ['Advanced SQL', 'Python / R', 'Descriptive & Inferential Statistics', 'Data Modeling'],
      frameworks: ['Pandas / NumPy', 'Tableau / PowerBI', 'dbt', 'BigQuery / Snowflake'],
      production: ['Data Pipeline Scheduling', 'Git Version Control', 'Automated Reporting', 'Data Quality Checks'],
      testing: ['Hypothesis Testing', 'Data Validation Rules', 'A/B Test Design']
    }
  };

  const currentRoleConfig = roleSkillMap[targetRole] || roleSkillMap['Full-Stack Web Developer'];
  const allRequired = [
    ...currentRoleConfig.core,
    ...currentRoleConfig.frameworks,
    ...currentRoleConfig.production,
    ...currentRoleConfig.testing
  ];

  const matchedList: any[] = [];
  const missingList: any[] = [];

  allRequired.forEach(reqSkill => {
    const isMatched = Array.from(normalizedKnown).some(k => k.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(k));
    if (isMatched) {
      const studentObj = studentSkills.find(s => s.name.toLowerCase().includes(reqSkill.toLowerCase()));
      matchedList.push({
        name: reqSkill,
        category: currentRoleConfig.core.includes(reqSkill) ? 'Core' : currentRoleConfig.frameworks.includes(reqSkill) ? 'Frameworks' : 'Production & Systems',
        studentProficiency: studentObj?.level || 'Intermediate',
        industryExpectation: 'Solid working experience building non-trivial features',
        statusNote: 'Good foundation identified'
      });
    } else {
      const isCritical = currentRoleConfig.core.includes(reqSkill) || currentRoleConfig.production.includes(reqSkill);
      missingList.push({
        name: reqSkill,
        category: currentRoleConfig.core.includes(reqSkill) ? 'Core' : currentRoleConfig.frameworks.includes(reqSkill) ? 'Frameworks' : 'Production & Systems',
        priority: isCritical ? 'Dealbreaker' : 'High',
        whyCompaniesDemand: `Essential requirement in 80%+ of ${targetRole} job descriptions for day-to-day team efficiency.`,
        estimatedHoursToLearn: isCritical ? 16 : 10,
        difficulty: isCritical ? 'Medium' : 'Challenging',
        typicalInterviewTrap: `Candidates know definitions but cannot explain trade-offs or live debugging.`
      });
    }
  });

  const matchRatio = matchedList.length / (allRequired.length || 1);
  const calculatedScore = Math.min(95, Math.max(25, Math.round(matchRatio * 100)));

  return {
    overallMatchScore: calculatedScore,
    summaryHeadline: calculatedScore >= 70 ? 'Strong baseline foundation with targeted gaps in production tooling' : 'Solid conceptual beginnings; high-priority gaps in real-world deployment & testing',
    executiveSummary: `You have established competency in several baseline areas (${matchedList.slice(0, 3).map(m => m.name).join(', ') || 'entry fundamentals'}), but employers for ${targetRole} will rigorously filter candidates missing ${missingList.slice(0, 2).map(m => m.name).join(' and ') || 'production workflows'}.`,
    categoryScores: [
      { category: 'Core Fundamentals', score: Math.min(100, calculatedScore + 15), feedback: 'Good conceptual knowledge' },
      { category: 'Frameworks & Tools', score: calculatedScore, feedback: 'Practical building blocks in place' },
      { category: 'Production & DevOps/Cloud', score: Math.max(20, calculatedScore - 20), feedback: 'High-leverage gap area for competitive advantage' },
      { category: 'Testing & Architecture', score: Math.max(15, calculatedScore - 25), feedback: 'Missing from academic syllabi, heavily tested in interviews' }
    ],
    matchedSkills: matchedList,
    missingSkills: missingList,
    marketInsights: {
      hiringDemandRating: 'High',
      topDifferentiator: 'Proof of building and deploying end-to-end applications rather than tutorial clones.',
      commonStudentPitfall: 'Listing technologies on CV without demonstrating testing, dockerization, or edge-case handling.'
    },
    roadmapPhases: [
      {
        phaseNumber: 1,
        title: 'Bridge Critical Foundation Gaps',
        weekSpan: `Weeks 1-${Math.ceil(timelineWeeks / 3)}`,
        theme: 'Eliminate resume dealbreakers',
        focusSkills: missingList.slice(0, 2).map(m => m.name),
        actionMilestones: [
          {
            id: 'm-1',
            title: `Master ${missingList[0]?.name || 'Core Architecture'}`,
            description: `Understand the fundamental design, lifecycle, and common failure modes in modern applications.`,
            estimatedHours: 12,
            handsOnDeliverable: `Build a standalone functional prototype implementing real async state and error boundaries.`,
            recommendedResources: [
              { name: 'Official Documentation & Guides', type: 'Documentation', tip: 'Focus on production best-practices section' },
              { name: 'Interactive Sandbox & Exercises', type: 'Interactive', tip: 'Write tests before shipping features' }
            ],
            interviewQuestion: `How do you handle error states and race conditions in ${missingList[0]?.name || 'production'}?`,
            keyAnswerTakeaway: `Explain defensive coding, retry mechanisms with exponential backoff, and state cleanup.`
          }
        ]
      },
      {
        phaseNumber: 2,
        title: 'Production Rigor & Modern Tooling',
        weekSpan: `Weeks ${Math.ceil(timelineWeeks / 3) + 1}-${Math.ceil((timelineWeeks * 2) / 3)}`,
        theme: 'Add enterprise-ready workflows',
        focusSkills: missingList.slice(2, 4).map(m => m.name),
        actionMilestones: [
          {
            id: 'm-2',
            title: `Containerize and Automate Workflows`,
            description: `Configure multi-stage Dockerfiles and continuous integration pipelines.`,
            estimatedHours: 15,
            handsOnDeliverable: `Dockerize your service with healthchecks and a GitHub Action that runs linter and tests on PR.`,
            recommendedResources: [
              { name: 'Docker & OCI Best Practices', type: 'Documentation', tip: 'Keep image layers lean with alpine bases' }
            ],
            interviewQuestion: `Why use multi-stage Docker builds instead of a single build stage?`,
            keyAnswerTakeaway: `Drastically reduces final image size, eliminates build tool attack surface, and speeds deployment.`
          }
        ]
      },
      {
        phaseNumber: 3,
        title: 'Capstone Proof-of-Work & Portfolio Defense',
        weekSpan: `Weeks ${Math.ceil((timelineWeeks * 2) / 3) + 1}-${timelineWeeks}`,
        theme: 'Showcase hireable engineering capability',
        focusSkills: ['System Design', 'Performance Optimization', 'Documentation'],
        actionMilestones: [
          {
            id: 'm-3',
            title: 'Ship Capstone with Architecture Diagram & Metrics',
            description: 'Publish a polished, deployed project with thorough README, live demo link, and architectural trade-off breakdown.',
            estimatedHours: 18,
            handsOnDeliverable: 'Live web URL + GitHub README featuring architecture diagram, setup commands, and benchmark results.',
            recommendedResources: [
              { name: 'Engineering Portfolio Blueprint', type: 'Course', tip: 'Recruiters spend 45 seconds on your GitHub: make the README shine.' }
            ],
            interviewQuestion: 'Walk me through a difficult bug you encountered in this project and how you solved it.',
            keyAnswerTakeaway: 'Use the STAR format: context, symptom, root cause diagnosis using logs/metrics, and the durable fix.'
          }
        ]
      }
    ],
    recommendedCapstoneProject: {
      title: `${targetRole} Industry Showcase Platform`,
      tagline: `Full-lifecycle production application targeting real enterprise challenges`,
      description: `A comprehensive project highlighting your newly acquired skills, demonstrating secure auth, persistent storage, automated testing, containerization, and public deployment.`,
      mustHaveFeatures: [
        'End-to-end automated testing suite with >70% coverage',
        'Docker Compose setup for reproducible local development',
        'CI/CD pipeline with GitHub Actions',
        'Responsive UI with clean accessibility and responsive performance'
      ],
      skillsDemonstrated: [
        ...matchedList.slice(0, 3).map(m => m.name),
        ...missingList.slice(0, 3).map(m => m.name)
      ]
    }
  };
}

// Development Vite Middleware setup or Production Static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Skill Gap server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
