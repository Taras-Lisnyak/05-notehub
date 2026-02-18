export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "work" | "personal" | "study"; 
  createdAt: string;  
  updatedAt: string;  
}

