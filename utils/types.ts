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
}
