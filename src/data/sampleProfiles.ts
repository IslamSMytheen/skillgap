import { StudentProfilePreset } from '../types';

export const SAMPLE_STUDENT_PROFILES: StudentProfilePreset[] = [
  {
    id: 'cs-sophomore',
    name: 'Alex Rivera',
    badge: 'CS Sophomore (Academic Focus)',
    targetRole: 'Full-Stack Web Developer',
    background: 'Computer Science sophomore with strong DSA coursework in Java & C++, basic Python scripting, and introductory Git. Has not worked with Docker, testing frameworks, or cloud databases.',
    skills: [
      { name: 'Java', level: 'Intermediate', category: 'Languages' },
      { name: 'C++', level: 'Intermediate', category: 'Languages' },
      { name: 'Data Structures & Algorithms', level: 'Intermediate', category: 'Fundamentals' },
      { name: 'Git & GitHub Collaboration', level: 'Beginner', category: 'Tools' },
      { name: 'Python', level: 'Beginner', category: 'Languages' },
      { name: 'HTML & CSS', level: 'Beginner', category: 'Web' }
    ]
  },
  {
    id: 'frontend-bootcamp',
    name: 'Maya Lin',
    badge: 'Bootcamp Grad (Frontend Heavy)',
    targetRole: 'Full-Stack Web Developer',
    background: 'Recent bootcamp graduate proficient in React, Tailwind CSS, and client-side JavaScript. Looking to qualify for full-stack positions by mastering server-side databases, APIs, Docker, and CI/CD.',
    skills: [
      { name: 'JavaScript & TypeScript', level: 'Intermediate', category: 'Languages' },
      { name: 'React & State Management', level: 'Intermediate', category: 'Frameworks' },
      { name: 'CSS & Tailwind CSS', level: 'Advanced', category: 'Web' },
      { name: 'HTML & CSS', level: 'Advanced', category: 'Web' },
      { name: 'Git & GitHub Collaboration', level: 'Intermediate', category: 'Tools' },
      { name: 'REST APIs (Consuming)', level: 'Intermediate', category: 'Web' },
      { name: 'Node.js & Express / Fastify', level: 'Beginner', category: 'Backend' }
    ]
  },
  {
    id: 'data-transition',
    name: 'David Chen',
    badge: 'Self-Taught Analyst -> AI Engineer',
    targetRole: 'AI & LLM Application Engineer',
    background: 'Self-taught data practitioner with solid Python and Pandas skills, exploratory SQL queries, and basic Jupyter notebooks. Wants to transition to building production RAG apps, vector search, and FastAPI backends.',
    skills: [
      { name: 'Python', level: 'Intermediate', category: 'Languages' },
      { name: 'Data Preprocessing & Cleaning', level: 'Intermediate', category: 'Data' },
      { name: 'Advanced SQL', level: 'Beginner', category: 'Data' },
      { name: 'Git & Version Control', level: 'Beginner', category: 'Tools' },
      { name: 'LLM APIs & Prompt Engineering', level: 'Beginner', category: 'AI' }
    ]
  },
  {
    id: 'sysadmin-devops',
    name: 'Jordan Taylor',
    badge: 'IT Support -> Cloud & DevOps',
    targetRole: 'Cloud & DevOps Engineer',
    background: 'IT systems technician comfortable with Linux terminal commands and basic bash scripting. Needs Kubernetes, Terraform, cloud infrastructure (AWS/GCP), and CI/CD pipelines to land a junior DevOps role.',
    skills: [
      { name: 'Linux System Administration & Bash', level: 'Intermediate', category: 'Systems' },
      { name: 'Networking & Protocols (TCP/IP, DNS, TLS)', level: 'Intermediate', category: 'Networking' },
      { name: 'Git & Version Control', level: 'Beginner', category: 'Tools' },
      { name: 'Docker & Container Runtimes', level: 'Beginner', category: 'Containers' }
    ]
  }
];
