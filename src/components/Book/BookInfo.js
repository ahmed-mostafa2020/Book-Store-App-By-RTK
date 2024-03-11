import { Fragment } from "react";

const BookInfo = ({ bookInfo }) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      {Object.values(bookInfo).length > 0 ? (
        <div>
          <p className="fw-bold">Title: {bookInfo.title} </p>
          <p className="fst-italic">Description: {bookInfo.description}</p>
          <p className="fst-italic">Price: {bookInfo.price}</p>
          <p className="fst-italic">Inserted By: {bookInfo.userName}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
