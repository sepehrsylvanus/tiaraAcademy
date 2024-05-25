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
  capacity: number;
  time: string[];
  creatorId?: string;
  creator?: User;
}

export interface UserProps {
  id: string;
  fName: string;
  lName: string | null;
  email: string;
  password: string;
  role: string;

  time: string;
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
  writing?: string | null;
  status: "pending" | "checked";
  writingAnswer: WritingAnswer[];
  writingLink?: string | null;
}
export interface WritingsToShow {
  writing: Writings;
  writingAnswer?: WritingAnswer;
}
export interface UserClasses {
  id: string;
  classId: string;
  userId: string;
  date: string;
  capacity: number;
  class: Class;
  time: string;
}
export interface WritingAnswer {
  id: string;
  writingId?: string | null;
  writing?: Writings;

  createdAt: Date;
  band: string;
}
export interface Video {
  id: string;
  title: string;
  videoLink: string | null;
  bucketKey: string | null;
  playlist: string[];
}

export interface Slide {
  title: string;
  subtitle: string;
  link: string;
}
