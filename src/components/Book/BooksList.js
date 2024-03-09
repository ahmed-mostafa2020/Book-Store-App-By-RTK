import React from "react";

const BooksList = ({ isLoading, books }) => {
  const booksList =
    books.length > 0 ? (
      books.map((item) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={item.id}
        >
          <div>{item.name}</div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary">
              Read
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <p>there is no books available</p>
    );

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <ul className="list-group">{booksList}</ul>
      )}
    </div>
  );
};

export default BooksList;
