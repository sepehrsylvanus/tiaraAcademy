export interface Class {
  id: string;
  title: string;
  link: string;

  classTime?: string | null;
  duration: string;
  rating: number;
  img?: string | null;
  featured: boolean;

  isPublic: boolean;
  isPrivate: boolean;
}

export interface Instructure {
  id: string;
  name: string;
  profileImg: string;
  isAdmin: boolean;
}

export interface Student {
  id: string;
  name: string;
  createdAt: Date;
}
