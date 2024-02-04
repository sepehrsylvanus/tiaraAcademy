export interface Class {
  id: string;
  title: string;
  link: string;
  instructure?: null;
  instructureId?: string;
  classTime: string;
  duration: string;
  rating: number;
  img?: string;
  featured: boolean;
  students?: null;
  studentId?: string;
  isPublic: boolean;
  isPrivate: boolean;
}

export interface Instructure {
  id: string;
  classes: Class[];
  name: string;
  profileImg: string;
  isAdmin: boolean;
  studentId?: string;
  students?: null;
}

export interface Student{
  id: string,
  classes: Class[],
  instructures: Instructure[],
  name: string,
  createdAt: Date
}