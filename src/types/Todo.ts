import { Priority } from "../enums/priority";

export interface Todo {
    id?:string;
    text: string;
    priority: Priority;
    dueDate: string;
    creationTime: string;
  }
