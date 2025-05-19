export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: boolean;
  datetime?: string;
  deadline?: string;
}
