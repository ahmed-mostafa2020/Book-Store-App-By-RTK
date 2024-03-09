import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuth } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.books);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const name = useSelector((state) => state.auth.name);

  return (
    <>
      {error && (
        <div
          className="alert alert-danger mb-0 d-flex justify-content-center"
          role="alert"
        >
          {error}
        </div>
      )}
      <nav className="navbar navbar-dark bg-dark px-5">
        <span className="navbar-brand mb-0 h1">My Books</span>

        {isLoggedIn && <span className="text-light">Hi, {name} </span>}

        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={() => dispatch(toggleAuth())}
        >
          {isLoggedIn ? "logOut" : "logIn"}
        </button>
      </nav>
    </>
  );
};

export default Header;
