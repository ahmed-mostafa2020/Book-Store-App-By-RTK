import React, { useRef } from "react";
import { insertBooks } from "../store/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const AddForm = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.books);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const name = useSelector((state) => state.auth.name); used getState() instead

  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
      // userName: name,
    };

    dispatch(insertBooks(data));

    title.current.value = null;
    price.current.value = null;
    description.current.value = null;
  };
  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              ref={title}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              ref={price}
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="Description"
              rows="3"
              required
              ref={description}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!isLoggedIn}
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
