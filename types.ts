export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  details: string[];
  duration?: string;
  includes?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Transformation {
  id: string;
  title: string;
  stylist: string;
  imageBefore: string;
  imageAfter: string;
}