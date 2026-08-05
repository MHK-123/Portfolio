export const PORTFOLIO_DATA = {
  profile: {
    name: 'Mohammed Hussain',
    role: 'Software Developer',
    education: '3rd-year B.E. · Artificial Intelligence & Machine Learning',
    location: 'Mumbai, India',
    email: 'mithanihussain.123@gmail.com',
    avatar: './assets/images/avatar.png',
    bootTaglines: [
      'Building SaaS',
      'Exploring AI',
      'Contributing to Open Source',
      'Learning DSA',
    ],
    bio: [
      "Hi, I'm Mohammed Hussain, a Software Developer and third-year B.E. student specializing in Artificial Intelligence & Machine Learning. I'm passionate about building scalable software, developer tools, and AI-powered products that solve real-world problems.",
      'My primary focus is full-stack development with TypeScript, Next.js, Node.js, PostgreSQL, and Python. I enjoy designing clean architectures, optimizing performance, and shipping production-ready applications.',
      "Outside of development, I'm actively exploring artificial intelligence, contributing to open-source projects, and continuously improving my problem-solving and software engineering skills.",
    ],
    interests: ['Building SaaS', 'Exploring AI', 'Contributing to Open Source', 'Learning DSA'],
    currentFocus: [
      'Full-stack SaaS development',
      'AI-powered product features',
      'Production-ready system design',
    ],
    hobbies: [
      'Coding',
      'Book Reading & Writing',
      'Learning Languages',
      'History',
      'Calisthenics',
      'Swimming',
      'Horse Riding',
      'UFC',
    ],
  },

  skills: {
    Languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C'],
    Frontend: ['Next.js', 'React', 'HTML', 'CSS', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express', 'REST APIs'],
    Database: ['PostgreSQL', 'SQLite'],
    Tools: ['Git', 'Docker', 'Postman', 'VS Code', 'Linux'],
    'Currently Learning': ['System Design', 'Cloud', 'AI Engineering'],
  },

  projects: [
    {
      slug: 'blueprint',
      aliases: ['blueprint-generator'],
      name: 'Blueprint Generator',
      subtitle: 'AI-Powered Project Planning & Documentation Platform',
      description:
        'An AI-assisted SaaS platform that helps developers transform ideas into structured project blueprints, technical documentation, and development roadmaps. It streamlines project planning with guided workflows, AI assistance, collaboration, and exportable documentation.',
      features: [
        'AI-powered project blueprint generation',
        'Interactive project planning workflow',
        'Collaboration & shared workspaces',
        'Theme customization & live previews',
        'Markdown & documentation export',
        'Project templates and resource hub',
        'Authentication & subscription plans',
      ],
      tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AI APIs'],
      status: 'live',
      thumbnail: null,
      placeholderClass: 'placeholder-blueprint',
      links: [
        { label: 'Live Demo', url: 'https://blueprintgenerator.insforge.site/login', primary: true },
      ],
    },
    {
      slug: 'finvora',
      name: 'Finvora ERP',
      subtitle: 'AI-Enhanced ERP & Business Management Platform',
      description:
        'A modern ERP platform built for businesses to manage accounting, inventory, analytics, and business operations through a unified dashboard. The platform focuses on automation, performance, and scalable architecture while integrating AI-assisted workflows.',
      features: [
        'Accounting & bookkeeping',
        'Inventory management',
        'GST & financial reports',
        'AI-powered insights',
        'Secure authentication',
        'Payment integration',
        'Analytics dashboard',
        'Role-based access',
      ],
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      status: 'development',
      thumbnail: './assets/images/finvora.png',
      placeholderClass: 'placeholder-finvora',
      links: [],
    },
    {
      slug: 'fluxa',
      name: 'Fluxa Media Suite',
      subtitle: 'Cross-Platform Media Downloader & Manager',
      description:
        'A desktop application for downloading and organizing media from multiple supported platforms through a clean interface. Built to provide a fast, lightweight experience for creators and everyday users.',
      features: [
        'Multi-platform media downloading',
        'Audio & video support',
        'Batch downloads',
        'Clean desktop interface',
        'Download management',
        'Cross-platform support',
      ],
      tech: ['Python', 'Tkinter', 'yt-dlp'],
      status: 'live',
      thumbnail: null,
      placeholderClass: 'placeholder-fluxa',
      links: [
        { label: 'View Product', url: 'https://contra.com/products/6oM1SNAD-fluxa', primary: true },
      ],
    },
    {
      slug: 'scribe',
      name: 'Scribe',
      subtitle: 'Discord Voice & Community Management Bot',
      description:
        'A feature-rich Discord bot focused on voice channel management, community automation, and server productivity. It helps communities automate repetitive tasks while improving moderation and member experience.',
      features: [
        'Voice channel automation',
        'Temporary voice channels',
        'Activity tracking',
        'Community management',
        'Moderation tools',
        'Logging & automation',
        'Custom server configuration',
      ],
      tech: ['Python', 'Discord.py', 'SQLite/PostgreSQL'],
      status: 'live',
      thumbnail: null,
      placeholderClass: 'placeholder-scribe',
      links: [{ label: 'Visit Website', url: 'https://www.scribebot.dev/', primary: true }],
    },
    {
      slug: 'subscription',
      aliases: ['discord-sub', 'sub-manager'],
      name: 'Discord Subscription Manager',
      subtitle: 'Automated Premium Subscription & Role Management',
      description:
        'A Discord subscription management system that automates premium memberships through payment integrations. It handles role assignments, renewals, subscription tracking, and webhook processing with minimal manual intervention.',
      features: [
        'Automated premium role assignment',
        'Subscription tracking',
        'Payment webhook integration',
        'Renewal reminders',
        'Access management',
        'Multi-plan support',
      ],
      tech: ['Node.js', 'Discord.js', 'Razorpay', 'PayPal'],
      status: 'live',
      thumbnail: null,
      placeholderClass: 'placeholder-subscription',
      links: [
        { label: 'Live App', url: 'https://subscription-ttob.onrender.com/', primary: true },
      ],
    },
    {
      slug: 'dungeonkeeper',
      aliases: ['dungeon-keeper', 'modmail'],
      name: 'DungeonKeeper',
      subtitle: 'Discord Moderation & ModMail System',
      description:
        'A Discord moderation bot designed to simplify server management through moderation utilities, ModMail support, and automated administrative tools for growing communities.',
      features: [
        'ModMail system',
        'Moderation commands',
        'Ticket management',
        'Logging',
        'Anti-spam tools',
        'Permission management',
      ],
      tech: ['Python', 'Discord.py'],
      status: 'live',
      thumbnail: './assets/images/dungeonkeeper.png',
      placeholderClass: 'placeholder-dungeonkeeper',
      links: [
        { label: 'Join Server', url: 'https://discord.gg/6XHQ4FpCuw', primary: true },
      ],
    },
  ],

  experience: {
    title: 'Data Science & Data Analytics Intern',
    organization: 'Internship Program',
    duration: 'Aug 3, 2026 – Present',
    programLength: '1-month program',
    status: 'Ongoing',
    description:
      'Completed a one-month internship focused on Data Science and Data Analytics, working on AI/ML-related projects while gaining practical experience with data analysis, machine learning concepts, and real-world problem solving.',
    responsibilities: [
      'Worked on AI & Machine Learning projects.',
      'Performed data analysis and preprocessing.',
      'Assisted in building and evaluating ML models.',
      'Collaborated with mentors on project development.',
      'Documented findings and project outcomes.',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook', 'Machine Learning'],
  },

  leadership: {
    organization: 'MUSA',
    organizationFull: "College MUSA Community",
    role: 'Administrator',
    duration: 'June 2026 – Present',
    description:
      "Serving as an Administrator for my college's MUSA community, contributing to community management, event coordination, and technical operations.",
    responsibilities: [
      'Manage community operations and moderation.',
      'Coordinate announcements and member engagement.',
      'Support administrative activities and event planning.',
      'Collaborate with the leadership team on community initiatives.',
    ],
  },

  timeline: [
    { year: '2023', event: 'Started learning programming' },
    { year: '2024', event: 'Built Discord bots and community tools' },
    { year: '2025', event: 'Started SaaS development' },
    {
      year: '2026',
      event:
        'Blueprint Generator, Finvora ERP, Fluxa, Scribe, Subscription Manager, Data Science internship, MUSA Administrator',
    },
  ],

  achievements: [
    'Data Science & Data Analytics Internship (Aug 2026 – Present)',
    'Administrator at MUSA — community operations & event coordination',
    'Built 6 production-oriented software projects',
    'Active open-source contributor and private repository maintainer',
    'Certifications — coming soon',
  ],

  resume: {
    viewUrl:
      'https://drive.google.com/file/d/1RgkBbbkoFQveS82xJkwevOKHVr_W-4hT/view?usp=sharing',
    downloadUrl:
      'https://drive.google.com/uc?export=download&id=1RgkBbbkoFQveS82xJkwevOKHVr_W-4hT',
  },

  social: [
    { name: 'GitHub', url: 'https://github.com/MHK-123', icon: 'github' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohammed-hussain-6306a1334/',
      icon: 'linkedin',
    },
    {
      name: 'Contra',
      url: 'https://contra.com/mohammed_hussain_2rqiwses/work?r=mohammed_hussain_2rqiwses',
      icon: 'contra',
    },
    { name: 'Email', url: 'mailto:mithanihussain.123@gmail.com', icon: 'email' },
    { name: 'X', url: 'https://x.com/Its_MH123', icon: 'x' },
    { name: 'Reddit', url: 'https://www.reddit.com/user/mhk-123/', icon: 'reddit' },
    { name: 'Discord', value: 'hussain.mhk', icon: 'discord', copy: true },
    { name: 'Instagram', url: 'https://www.instagram.com/insane_mh123/', icon: 'instagram' },
  ],

  formspree: 'https://formspree.io/f/mojkoobv',

  commands: [
    { cmd: 'help', desc: 'Show all available commands' },
    { cmd: 'about', desc: 'Professional introduction & background' },
    { cmd: 'skills', desc: 'Technical skills by category' },
    { cmd: 'projects', desc: 'List all featured projects' },
    { cmd: 'open <slug>', desc: 'Open project preview (e.g. open blueprint)' },
    { cmd: 'experience', desc: 'Internship & work experience' },
    { cmd: 'leadership', desc: 'Community leadership roles' },
    { cmd: 'achievements', desc: 'Key accomplishments' },
    { cmd: 'timeline', desc: 'Career & learning journey' },
    { cmd: 'resume', desc: 'View and download resume' },
    { cmd: 'contact', desc: 'Contact form & social links' },
    { cmd: 'socials', desc: 'All social media links' },
    { cmd: 'theme [name]', desc: 'Switch theme (cyan, matrix, purple, amber, white)' },
    { cmd: 'clear', desc: 'Clear terminal output' },
    { cmd: 'history', desc: 'Show command history' },
    { cmd: 'whoami', desc: 'Quick identity check' },
    { cmd: 'neofetch', desc: 'System-style info card' },
    { cmd: 'github', desc: 'Open GitHub profile' },
    { cmd: 'linkedin', desc: 'Open LinkedIn profile' },
  ],

  themes: ['cyan', 'matrix', 'purple', 'amber', 'white'],

  quickCommands: ['help', 'about', 'projects', 'resume', 'contact'],
};

export function getProjectBySlug(slug) {
  const normalized = slug.toLowerCase().trim();
  return PORTFOLIO_DATA.projects.find(
    (p) => p.slug === normalized || (p.aliases && p.aliases.includes(normalized))
  );
}
