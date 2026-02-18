import css from "./NoteList.module.css";
import type { Note, FetchNotesResponse } from "../../types/note";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface NoteListProps {
  page: number;
  perPage: number;
  search?: string;
}

const NoteList = ({ page, perPage, search }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData, // ✅ заміна keepPreviousData: true
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // зачепить усі варіанти
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Error loading notes" />;
  if (!data || data.notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
