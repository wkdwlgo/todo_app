//todo에 대한 type 인터페이스 
export interface Todo_type {
  id: number;
  name: string;
  memo?: string;
  imageUrl?: string; 
  isCompleted: boolean; 
  tenantId?: string; 
}