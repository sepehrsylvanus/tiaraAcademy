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
  persianTitle: string;
  type: "placement" | "1v1" | "group" | "workshop";
  price: string;
  discountedPrice: string;
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
  link: string;
  discount: string;
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
  createdAt: Date;
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

export interface VideoCourseSession {
  id: string;
  title: string;
  video: string;
  videoCourseId: string;
  comment?: Comment;
}
export interface VideoCourse {
  id: string;

  title: string;

  description: string;

  updatedAt: Date;

  teacherId: string;

  explenation: string;

  thumbnailLink: string;

  price: number;

  materialsLink: string;

  category: string;

  prerequisities: string[];
  teacher: User;
  videoCourseSession: VideoCourseSession[];
}
export interface Comment {
  id: string;
  createdAt: Date;
  content: string;
  CommentAnswer: CommentAnswer[];
  video?: VideoCourse;
  videoCourseId?: string;
  videoCourseSession?: VideoCourseSession;
  videoCourseSessionId?: string;
}

export interface CommentAnswer {
  id: string;
  createdAt: Date;
  content: string;
  comment: Comment;
  commentId: string;
}
export interface Notif {
  id: string;
  title: string;
  status: "read" | "unread";
  type: "register" | "joinClass";
  user: User;
  createdAt: Date;
  userId: string;
  classId?: string;
  cls?: Class;
  classTime: string;
}
