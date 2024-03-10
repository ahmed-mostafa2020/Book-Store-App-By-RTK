import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const BooksList = ({ isLoading, books, isLoggedIn, deleteBooks, dispatch }) => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const booksList =
    books.length > 0 ? (
      books.map((item) => (
        <li
          className="list-group-item d-flex  justify-content-between align-items-center"
          key={item.id}
        >
          <div>{item.title}</div>

          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isLoggedIn}
            >
              Read
            </button>

            <button
              type="button"
              className="btn btn-danger"
              disabled={!isLoggedIn}
              onClick={() => setData(item) + setShow(true)}
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <p>there is no books available</p>
    );

  return (
    <>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            Are you sure to delete book with title :{" "}
            <strong>{data?.title}</strong> ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => dispatch(deleteBooks(data)) + handleClose()}
          >
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BooksList;
