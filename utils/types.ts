export interface User {
  id: string;
  fName: string;
  lName: string | null;
  email: string;
  password: string;
  role: string;
  classes?: Class[];
}

export interface Class {
  id: string;
  createdAt: Date;
  title: string;
  days: string[];
  price: string;
  type: string;
  creatorId?: string;
  creator: User;
}

export interface UserProps {
  id: string;
  fName: string;
  lName: string | null;
  email: string;
  password: string;
  role: string;
}

export interface Writings {
  id: string;
  name: string;
  teacherId: string;
  email: string;
  subject: string;
  subjectImgURL: string;
  writing: string;
  writingLink?: string;
}
export interface Video {
  id: string;
  title: string;
  videoLink: string;
}

export interface Slide {
  title: string;
  subtitle: string;
  link: string;
}
