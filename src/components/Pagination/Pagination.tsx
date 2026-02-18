import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: number) => void; 
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) return null; 

  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

