import React from "react";
import { Link } from "react-router-dom";

const BookItem = (item) => {
  return (
    <div className="bookInfoContainer">
      <Link to={`/books/${item._id}`}>
        <div className="bookName">{item.name}</div>
        <div className="bookAuthor">{item.author}</div>
        <div className="bookInfo">
          <div className="price">
            <strong>Price : $ {item.price}</strong>
          </div>
          <div className="pages">
            <strong>Pages : {item.pages}</strong>
          </div>
          <div className="rating">
            <strong>Rating : {item.rating}</strong>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookItem;
