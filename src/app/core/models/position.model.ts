export interface Position {
  id: number;
  name: string;
  description?: string;
  parentId?: number | null;
  children?: Position[];
}
