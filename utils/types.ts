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
  creatorId: string;
  creator: User;
  name?: string | null;
  teacherId: string;
  email?: string | null;
  subject?: string | null;
  subjectImgURL?: string | null;
  writing?: string;
  status: "pending" | "checked";
  writingAnswer: WritingAnswer[];
  writingLink?: string;
}

export interface WritingAnswer {
  id: string;
  writingId?: string;
  writing?: Writings;

  createdAt: Date;
  band: string;
}
export interface Video {
  id: string;
  title: string;
  videoLink: string;
  bucketKey: string;
}

export interface Slide {
  title: string;
  subtitle: string;
  link: string;
}
