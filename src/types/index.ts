export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  image: string;
  category?: 'AI & Agents' | 'Full Stack' | 'Voice AI' | 'MLOps' | 'Frontend' | string;
  featured?: boolean;
  highlight?: string;
  status?: 'ONLINE' | 'DEPLOYED' | 'PRODUCTION' | 'EXPERIMENTAL';
  architecture?: string[];
}

export interface Blog {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}