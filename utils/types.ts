export type TCertificate = {
  id: number;
  src: string;
  alt: string;
  metadata?: {
    title: string;
    description: string;
    date: string;
    issuer: string;
    tags: string[];
    image: string;
  };
  link: {
    href: string;
    target: string;
    rel: string;
  };
};

export type TSkillData = {
  src: string;
  name: string;
  position: { x: number; y: number };
};

export type TNavigationLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};
