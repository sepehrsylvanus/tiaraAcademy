export interface User {
  id: string;
  fName: string;
  lName?: string;
  email: string;
  password: string;
}

export interface Class {
  id: string;
  title: string;
  days: string[];
  price: string;
  type: string;
  tutorID?: string;
  tutor: User[];
}
