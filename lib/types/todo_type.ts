export interface Todo_type {
  id: number;
  name: string;
  memo?: string;
  imageUrl?: string; 
  isCompleted: boolean; 
  tenantId?: string; 
}