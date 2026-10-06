import { BenchmarkRole } from '../types';

export const BENCHMARK_ROLES: BenchmarkRole[] = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Web Developer',
    iconName: 'Layers',
    description: 'Builds responsive frontends, scalable REST/GraphQL APIs, database models, and cloud deployments.',
    averageSalaryRange: '$85,000 - $135,000',
    demandRating: 'Very High',
    requiredSkills: [
      { name: 'JavaScript & TypeScript', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Strong static typing, async/await, closures, and ESNext features.', expectedLevel: 'Advanced' },
      { name: 'React & State Management', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Component architecture, custom hooks, effect lifecycles, and state stores.', expectedLevel: 'Intermediate' },
      { name: 'Node.js & Express / Fastify', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'RESTful API routing, middleware, request validation, and error handlers.', expectedLevel: 'Intermediate' },
      { name: 'PostgreSQL / Relational DBs', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Schema design, indexing, foreign keys, migrations, and ACID queries.', expectedLevel: 'Intermediate' },
      { name: 'Git & GitHub Collaboration', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'Branching strategies, merge conflict resolution, PR reviews, and semantic commits.', expectedLevel: 'Intermediate' },
      { name: 'Docker & Containerization', category: 'Production & DevOps', importance: 'High', description: 'Multi-stage Dockerfiles, docker-compose for local environments.', expectedLevel: 'Intermediate' },
      { name: 'Unit & E2E Testing', category: 'Testing & Architecture', importance: 'High', description: 'Writing automated test suites using Vitest, Jest, or Playwright.', expectedLevel: 'Intermediate' },
      { name: 'CI/CD Pipelines (GitHub Actions)', category: 'Production & DevOps', importance: 'High', description: 'Automating linting, test suites, and preview environment deployments.', expectedLevel: 'Beginner' },
      { name: 'Redis / Caching', category: 'Frameworks & Tools', importance: 'Advantage', description: 'In-memory caching, rate-limiting, and session management.', expectedLevel: 'Beginner' },
      { name: 'System Design & Scalability', category: 'Testing & Architecture', importance: 'Advantage', description: 'Load balancers, stateless servers, horizontal scaling, and latency bottlenecks.', expectedLevel: 'Beginner' }
    ],
    recommendedProjects: [
      'Full-stack collaborative issue tracker with real-time updates and PostgreSQL transactions',
      'E-commerce API with Redis caching, Stripe webhooks, and comprehensive integration tests'
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI & LLM Application Engineer',
    iconName: 'Cpu',
    description: 'Bridges modern Foundation Models, RAG pipelines, Vector Search, and production web applications.',
    averageSalaryRange: '$110,000 - $165,000',
    demandRating: 'Very High',
    requiredSkills: [
      { name: 'Python', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Object-oriented Python, async I/O, typing, and standard data libraries.', expectedLevel: 'Advanced' },
      { name: 'LLM APIs & Prompt Engineering', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Structured JSON output, function calling, tool use, token cost optimization.', expectedLevel: 'Advanced' },
      { name: 'RAG Architecture & Vector DBs', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Chunking strategies, hybrid search, embeddings, Pinecone / Chroma / pgvector.', expectedLevel: 'Intermediate' },
      { name: 'FastAPI / Modern Backend', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Asynchronous streaming endpoints (SSE), Pydantic schemas, dependency injection.', expectedLevel: 'Intermediate' },
      { name: 'Git & Version Control', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'Reproducible experiment tracking and code versioning.', expectedLevel: 'Intermediate' },
      { name: 'Docker & Model Serving', category: 'Production & DevOps', importance: 'High', description: 'Containerizing inference services and managing memory constraints.', expectedLevel: 'Intermediate' },
      { name: 'LLM Evaluation & Guardrails', category: 'Testing & Architecture', importance: 'High', description: 'Benchmarking hallucinations, latency, token budgets, and security jailbreaks.', expectedLevel: 'Intermediate' },
      { name: 'Agentic Frameworks (LangGraph / CrewAI)', category: 'Frameworks & Tools', importance: 'Advantage', description: 'Multi-agent orchestration, state machines, and human-in-the-loop flows.', expectedLevel: 'Beginner' },
      { name: 'Cloud Deployment (AWS/GCP/Modal)', category: 'Production & DevOps', importance: 'High', description: 'Deploying serverless or GPU-accelerated endpoints securely.', expectedLevel: 'Beginner' },
      { name: 'Data Preprocessing & Cleaning', category: 'Core Fundamentals', importance: 'Advantage', description: 'Pandas, regex token sanitization, and handling unstructured document formats.', expectedLevel: 'Intermediate' }
    ],
    recommendedProjects: [
      'Enterprise Document Q&A system with hybrid retrieval, cited source highlights, and RAG evaluation metrics',
      'Autonomous Code Reviewer agent with multi-file contextual reasoning and GitHub PR integration'
    ]
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    iconName: 'Monitor',
    description: 'Specializes in craft, UI architecture, accessibility, web performance, and complex client state.',
    averageSalaryRange: '$85,000 - $130,000',
    demandRating: 'High',
    requiredSkills: [
      { name: 'Modern JavaScript & TypeScript', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'DOM manipulation, Event loop, closures, generics, and strict TypeScript.', expectedLevel: 'Advanced' },
      { name: 'React 19 & Next.js / Vite', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Server components, client hooks, hydration, and routing paradigms.', expectedLevel: 'Advanced' },
      { name: 'CSS & Tailwind CSS', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Flexbox, CSS Grid, responsive design, transitions, and utility classes.', expectedLevel: 'Advanced' },
      { name: 'State Architecture & Data Fetching', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Zustand/Redux, TanStack Query, optimistic UI updates, and cache invalidation.', expectedLevel: 'Intermediate' },
      { name: 'Web Performance & Core Web Vitals', category: 'Testing & Architecture', importance: 'High', description: 'Bundle splitting, image optimization, LCP/INP/CLS metrics, memoization.', expectedLevel: 'Intermediate' },
      { name: 'Accessibility (a11y) & Semantic HTML', category: 'Testing & Architecture', importance: 'High', description: 'ARIA attributes, keyboard navigation, screen reader compatibility.', expectedLevel: 'Intermediate' },
      { name: 'Testing (Playwright & Vitest)', category: 'Testing & Architecture', importance: 'High', description: 'Component visual regression and user interaction test suites.', expectedLevel: 'Intermediate' },
      { name: 'Git & Pull Request Workflows', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'Feature branches, design system adherence, and code reviews.', expectedLevel: 'Intermediate' },
      { name: 'Animation & Micro-interactions', category: 'Frameworks & Tools', importance: 'Advantage', description: 'Motion / Framer Motion, spring physics, and fluid gesture interactions.', expectedLevel: 'Beginner' }
    ],
    recommendedProjects: [
      'Figma-grade interactive canvas or dashboard with fluid drag-and-drop, high FPS, and WCAG AA compliance',
      'Modern SaaS customer portal with TanStack Query, optimistic updates, and offline resilience'
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    iconName: 'Cloud',
    description: 'Architects automated infrastructure, CI/CD pipelines, Kubernetes clusters, and zero-downtime reliability.',
    averageSalaryRange: '$95,000 - $150,000',
    demandRating: 'Very High',
    requiredSkills: [
      { name: 'Linux System Administration & Bash', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Processes, permissions, networking, pipes, and shell automation scripts.', expectedLevel: 'Advanced' },
      { name: 'Docker & Container Runtimes', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'Layer caching, security scanning, rootless containers, multi-platform builds.', expectedLevel: 'Advanced' },
      { name: 'Kubernetes (K8s)', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'Pods, Deployments, Services, Ingress, ConfigMaps, and StatefulSets.', expectedLevel: 'Intermediate' },
      { name: 'Infrastructure as Code (Terraform)', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'HCL declarative configuration, state management, modules, and drifts.', expectedLevel: 'Intermediate' },
      { name: 'CI/CD Automation (GitHub Actions / GitLab)', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'Build matrices, artifacts, secrets management, and automated release tags.', expectedLevel: 'Intermediate' },
      { name: 'Cloud Platform (AWS or GCP)', category: 'Production & DevOps', importance: 'Dealbreaker', description: 'IAM policies, VPCs, subnets, S3/Cloud Storage, and serverless compute.', expectedLevel: 'Intermediate' },
      { name: 'Observability (Prometheus & Grafana)', category: 'Testing & Architecture', importance: 'High', description: 'Metrics scraping, dashboards, alerting rules, and log aggregation.', expectedLevel: 'Intermediate' },
      { name: 'Networking & DNS / TLS', category: 'Core Fundamentals', importance: 'High', description: 'TCP/IP, HTTP/2, load balancers, SSL certificates, and DNS records.', expectedLevel: 'Intermediate' },
      { name: 'Security & Secret Management (Vault / SOPS)', category: 'Testing & Architecture', importance: 'Advantage', description: 'Zero-trust architecture, automated vulnerability scanning.', expectedLevel: 'Beginner' }
    ],
    recommendedProjects: [
      'GitOps-driven multi-environment Kubernetes cluster provisioned via Terraform with Prometheus monitoring',
      'Zero-downtime blue/green deployment pipeline for microservices with automated rollback triggers'
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst & Analytics Engineer',
    iconName: 'BarChart3',
    description: 'Transforms raw business data into actionable dashboards, data models, and statistical insights.',
    averageSalaryRange: '$75,000 - $115,000',
    demandRating: 'High',
    requiredSkills: [
      { name: 'Advanced SQL', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Window functions, CTEs, complex joins, indexing, and query optimization.', expectedLevel: 'Advanced' },
      { name: 'Python (Pandas & NumPy)', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Data wrangling, aggregation, missing data handling, and exploratory data analysis.', expectedLevel: 'Intermediate' },
      { name: 'BI & Visualization (Tableau / PowerBI)', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Executive dashboards, calculated fields, drill-downs, and visual storytelling.', expectedLevel: 'Intermediate' },
      { name: 'Data Modeling & Dimensional Design', category: 'Testing & Architecture', importance: 'Dealbreaker', description: 'Star schema, snowflake schema, slowly changing dimensions (SCD).', expectedLevel: 'Intermediate' },
      { name: 'dbt (data build tool)', category: 'Frameworks & Tools', importance: 'High', description: 'Transformations, automated documentation, tests, and lineage DAGs.', expectedLevel: 'Intermediate' },
      { name: 'Cloud Data Warehouses (BigQuery / Snowflake)', category: 'Production & DevOps', importance: 'High', description: 'Partitioning, clustering, billing cost control, and staging tables.', expectedLevel: 'Intermediate' },
      { name: 'Statistical Analysis & A/B Testing', category: 'Core Fundamentals', importance: 'High', description: 'P-values, confidence intervals, sample size determination, regression models.', expectedLevel: 'Intermediate' },
      { name: 'Git & Version Control for Analytics', category: 'Production & DevOps', importance: 'High', description: 'Collaborative code reviews and pull requests for analytical models.', expectedLevel: 'Beginner' }
    ],
    recommendedProjects: [
      'End-to-end modern data stack pipeline: Raw CSV ingestion -> dbt transformations in BigQuery -> interactive executive dashboard',
      'E-commerce user retention and cohort churn analysis with statistical significance testing'
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security Analyst',
    iconName: 'Shield',
    description: 'Defends systems against threats, monitors security events, assesses vulnerabilities, and enforces compliance.',
    averageSalaryRange: '$85,000 - $135,000',
    demandRating: 'High',
    requiredSkills: [
      { name: 'Networking & Protocols (TCP/IP, DNS, TLS)', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Packet inspection, Wireshark, routing, subnets, and firewall rules.', expectedLevel: 'Advanced' },
      { name: 'Linux System Administration & Scripting', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Auditing user privileges, crontabs, bash/python automation.', expectedLevel: 'Intermediate' },
      { name: 'OWASP Top 10 & AppSec Basics', category: 'Testing & Architecture', importance: 'Dealbreaker', description: 'SQLi, XSS, CSRF, SSRF, broken auth, and defensive coding practices.', expectedLevel: 'Intermediate' },
      { name: 'SIEM & Log Analysis (Splunk / Elastic)', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Querying authentication logs, alert triage, incident detection rules.', expectedLevel: 'Intermediate' },
      { name: 'Vulnerability Assessment & Scanners (Nmap / Nessus)', category: 'Frameworks & Tools', importance: 'High', description: 'Port scanning, service discovery, CVE evaluation, and remediation plans.', expectedLevel: 'Intermediate' },
      { name: 'Identity & Access Management (IAM)', category: 'Production & DevOps', importance: 'High', description: 'MFA, SSO, RBAC principles, least-privilege enforcement.', expectedLevel: 'Intermediate' },
      { name: 'Threat Modeling & Risk Frameworks', category: 'Testing & Architecture', importance: 'High', description: 'STRIDE model, MITRE ATT&CK matrix mapping.', expectedLevel: 'Beginner' }
    ],
    recommendedProjects: [
      'Home Lab Security Operations Center (SOC) with automated Sysmon log forwarding and Elastic alert correlation',
      'Vulnerability audit report of an intentionally vulnerable web application with mitigation pull request'
    ]
  },
  {
    id: 'mobile-engineer',
    title: 'Mobile App Developer',
    iconName: 'Smartphone',
    description: 'Crafts performant iOS and Android apps with native device capabilities and offline synchronization.',
    averageSalaryRange: '$85,000 - $135,000',
    demandRating: 'Growing',
    requiredSkills: [
      { name: 'React Native / Flutter', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Cross-platform rendering, native bridge/JSI, platform-specific code.', expectedLevel: 'Advanced' },
      { name: 'TypeScript / Dart', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Strict typing, asynchronous patterns, reactive streams.', expectedLevel: 'Advanced' },
      { name: 'Offline Storage & Sync', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'SQLite / WatermelonDB / Realm, local cache invalidation, conflict resolution.', expectedLevel: 'Intermediate' },
      { name: 'Mobile UI/UX Guidelines', category: 'Core Fundamentals', importance: 'High', description: 'Apple Human Interface & Material Design guidelines, safe areas, gestures.', expectedLevel: 'Intermediate' },
      { name: 'App Store & Play Store Deployment', category: 'Production & DevOps', importance: 'High', description: 'Code signing, provisioning profiles, fastlane automation, app bundle optimization.', expectedLevel: 'Beginner' },
      { name: 'Push Notifications & Background Tasks', category: 'Frameworks & Tools', importance: 'High', description: 'APNs, FCM, battery efficiency, and background fetch lifecycles.', expectedLevel: 'Intermediate' },
      { name: 'Automated Mobile Testing (Maestro / Detox)', category: 'Testing & Architecture', importance: 'High', description: 'E2E mobile interaction testing across device form factors.', expectedLevel: 'Beginner' }
    ],
    recommendedProjects: [
      'Offline-first field notes app with camera capture, local SQLite sync, and biometric biometric lock',
      'Location-based fitness tracking app with background GPS tracking and battery conservation'
    ]
  },
  {
    id: 'backend-engineer',
    title: 'Backend Systems Engineer',
    iconName: 'Server',
    description: 'Designs high-throughput APIs, data pipelines, distributed systems, and transactional databases.',
    averageSalaryRange: '$90,000 - $145,000',
    demandRating: 'Very High',
    requiredSkills: [
      { name: 'Go / Java / Python / Node.js', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Concurrency, memory management, garbage collection mechanics.', expectedLevel: 'Advanced' },
      { name: 'Relational Database Design (Postgres/MySQL)', category: 'Core Fundamentals', importance: 'Dealbreaker', description: 'Transactions, isolation levels, foreign keys, EXPLAIN ANALYZE queries.', expectedLevel: 'Advanced' },
      { name: 'REST & gRPC / Protobuf API Design', category: 'Frameworks & Tools', importance: 'Dealbreaker', description: 'Idempotency keys, semantic status codes, binary serialization.', expectedLevel: 'Intermediate' },
      { name: 'Distributed Systems Fundamentals', category: 'Testing & Architecture', importance: 'Dealbreaker', description: 'CAP theorem, eventual consistency, partition tolerance, circuit breakers.', expectedLevel: 'Intermediate' },
      { name: 'Message Queues (Kafka / RabbitMQ / SQS)', category: 'Frameworks & Tools', importance: 'High', description: 'Asynchronous event decoupling, backpressure, consumer groups, dead letter queues.', expectedLevel: 'Intermediate' },
      { name: 'Docker & Kubernetes Fundamentals', category: 'Production & DevOps', importance: 'High', description: 'Containerized packaging and pod lifecycle management.', expectedLevel: 'Intermediate' },
      { name: 'Integration Testing & Mocking', category: 'Testing & Architecture', importance: 'High', description: 'Testcontainers, synthetic load generation, and database isolation in tests.', expectedLevel: 'Intermediate' },
      { name: 'Caching & Read Replicas (Redis)', category: 'Frameworks & Tools', importance: 'High', description: 'Write-through vs cache-aside strategies, TTL tuning.', expectedLevel: 'Intermediate' }
    ],
    recommendedProjects: [
      'High-throughput ticket reservation engine with distributed locks, Redis rate-limiting, and Postgres transactions',
      'Event-driven order fulfillment microservice using Kafka, dead-letter queues, and OpenTelemetry tracing'
    ]
  }
];
