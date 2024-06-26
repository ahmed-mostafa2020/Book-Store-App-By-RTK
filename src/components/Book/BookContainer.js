import { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import "./book.css";

import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBooks } from "../../store/bookSlice";

const BookContainer = () => {
  const [bookInfo, setBookInfo] = useState({});

  const dispatch = useDispatch();
  const { isLoading, books } = useSelector((state) => state.books); // not destructed before exporting
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // destructed before exporting

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const getBookId = (id) => {
    const selectedBook = books.find((item) => item.id === id);

    setBookInfo((prev) => {
      // Do not mutate the state
      return { ...prev, ...selectedBook };
    });
  };

  // Check if will delete the book you read
  const resetBookInfo = (id) => {
    if (id === bookInfo.id) {
      setBookInfo({});
    }
  };

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row mb-5">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBooks={deleteBooks}
            dispatch={dispatch}
            getBookId={getBookId}
            resetBookInfo={resetBookInfo}
          />
        </div>
        <div className="col side-line">
          <BookInfo bookInfo={bookInfo} />
        </div>
      </div>
    </Fragment>
  );
};

export default BookContainer;
