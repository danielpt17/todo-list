import { Priority } from "../enums/priority";

export interface Todo {
    text: string;
    priority: Priority;
    dueDate: string;
    creationTime: string;
  }
