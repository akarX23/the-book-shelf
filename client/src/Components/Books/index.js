import React from "react";
import BookViewContainer from "../../Containers/BookViewContainer";

const BookView = (props) => {
  return (
    <div>
      <BookViewContainer {...props} />
    </div>
  );
};

export default BookView;
