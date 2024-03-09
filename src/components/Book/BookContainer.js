import React, { Fragment, useEffect } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import "./book.css";

import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../store/bookSlice";

const BookContainer = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList isLoading={isLoading} />
        </div>
        <div className="col side-line">
          <BookInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default BookContainer;
