export interface Class {
  id: string;
  title: string;
  link: string;
  dates?: string[];
  classTime?: string | null;
  duration: string;
  rating: number;
  img?: string | null;
  featured: boolean;
  price: number;
  isPrivate: boolean;
  classInstructors: ClassInstructor[];
}

export interface Instructure {
  id: string;
  name: string;
  profileImg: string;
  role: string;
  job: string;
}

export interface Student {
  id: string;
  name: string;
  createdAt: Date;
}

interface ClassInstructor {
  id: string;
  classId: string;
  instructorId: string;
  instructor: Instructure;
}
export interface ClassProps {
  params: { class: string };
  searchParams: { teacher: string; id: string };
}

export interface Slide {
  title: string;
  subtitle: string;
  link: string;
}
