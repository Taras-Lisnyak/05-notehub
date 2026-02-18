export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// response from the API when fetching notes
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
