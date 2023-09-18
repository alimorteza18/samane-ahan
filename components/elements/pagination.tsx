import useWindowDimensions, { breakpoints } from "@/hooks/use-window-dimension";
import { useState } from "react";
import { useEffect } from "react";

export default function Pagination({
  page,
  setPage,
  totalPages,
  perPage,
  autoScrollUp = true,
}: PaginationProps) {
  const [pages, setPages] = useState<any[]>([1]);
  const { width } = useWindowDimensions();

  function range(start: number, end: number) {
    let length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  }

  function getPaginationRange(width = 800) {
    const DOTS = "...";
    const buttonConst = width > breakpoints.sm ? 3 : 2;
    const siblingCount = width > breakpoints.sm ? 2 : 1;

    // Pages count is determined as siblingCount + buttonConst(firstPage + lastPage + page) + 2*DOTS
    const totalPageNumbers = buttonConst + 2 + siblingCount;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    //@ts-ignore
    if (totalPageNumbers >= totalPages) return range(1, totalPages);

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    //@ts-ignore
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    //@ts-ignore
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages) //prettier-ignore

    /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    //@ts-ignore
    const shouldShowRightDots = rightSiblingIndex <= totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    /*
      No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = buttonConst + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPages];
    }

    /*
      No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = buttonConst + 2 * siblingCount;
      //@ts-ignore
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }

  useEffect(() => {
    const pagRange = getPaginationRange(width);
    //@ts-ignore
    setPages(pagRange);
  }, [page, perPage, width, totalPages]);

  return (
    <div className="pagination-area mt-20 mb-20">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-start">
          {width > breakpoints.sm ? (
            <li
              className="page-item"
              onClick={() => {
                //@ts-ignore
                if (page > 1) {
                  //@ts-ignore
                  setPage(page - 1);
                }
              }}
            >
              <a className="page-link" href={autoScrollUp ? "#" : undefined}>
                <i className="fi-rs-arrow-small-right"></i>
              </a>
            </li>
          ) : null}

          {pages &&
            pages.map((p) => (
              <li
                key={p}
                className={`page-item ${page == p ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                <a className="page-link" href={autoScrollUp ? "#" : undefined}>
                  {p}
                </a>
              </li>
            ))}
          {width > breakpoints.sm ? (
            <li
              className="page-item"
              onClick={() => {
                {
                  //@ts-ignore
                  if (page < totalPages) {
                    //@ts-ignore
                    setPage(page + 1);
                  }
                }
              }}
            >
              <a className="page-link" href={autoScrollUp ? "#" : undefined}>
                <i className="fi-rs-arrow-small-left"></i>
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
}

type PaginationProps = {
  totalPages: string | number | undefined;
  page: number | string;
  perPage: number | string;
  setPage: (newPage: number) => void;
  autoScrollUp?: boolean;
};
