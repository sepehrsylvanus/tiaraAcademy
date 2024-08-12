import { User } from "lucide-react";
import { boolean } from "zod";

export interface User {
  id: string;
  fName: string;
  lName: string | null;
  email: string;
  password: string;
  role: string;
  pNumber: string;
  classes?: Class[];
  additionalEmails: string[];
  addintionalPNumbers: string[];
  image: string | null;
}

export interface Class {
  id: string;

  ClassUsers: UserClasses;
  teacher: User;
  teacherId: string;
  title: string;
  type: string;
  price: string;
  capacity: number;
  days: string[];
  date: Date;
  duration: string[];
  times: string[];
  description: string;
  prerequisites: string[];
  outline: string[];
  imageLink?: string;
  imageName?: string;
  createdAt: Date;
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
  playlistTitle: string;
  Playlist?: Playlist;
  caption: string;
  trend: boolean;
  creatorId: string;
  creator?: User;
  createDate: Date;
}

export interface Blogs {
  id: string;
  title: string;
  image: string | null;
  author: User;
  categories: string;
  text: string;
  createdAt: Date;
  authorId: string;
  bucketKey: string | null;
  trend: boolean;
}

export interface Slide {
  title: string;
  subtitle: string;
  link: string;
}

export interface Playlist {
  title: string;
  value: string;
  type: "private" | "public";
  price: string | null;
  description: string;
  Video?: Video;
}
