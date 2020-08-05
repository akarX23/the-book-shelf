import React, { Component } from "react";
import { connect } from "react-redux";
import { getBookWithReviewer, clearBookWithReviewer } from "../actions";
import { bindActionCreators } from "redux";

class BookViewContainer extends Component {
  componentWillMount() {
    this.props.getBookWithReviewer(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearBookWithReviewer();
  }

  renderBook = (book, reviewer) => {
    return (
      <div className="bookview-wrapper">
        <div className="bookview-wrapper-info">
          <h1>{book.name}</h1>
          <h2>{book.author}</h2>
          <h3>
            <strong>Reviewed by : </strong>
            {reviewer.name + " " + reviewer.lastname}
          </h3>
        </div>
        <div className="bookview-review">{book.review}</div>
        <div className="bookview-stats">
          <div className="features">
            <strong>Pages: </strong>
            {book.pages}
            <br />
            <div>
              <strong>Price: </strong>
              {book.price}
            </div>
          </div>
          <div className="book-rating">
            <div>
              <strong>Rating</strong>
              <br />
              {book.rating} / 5
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let book = this.props.book.book ? this.props.book.book : null;
    let reviewer = this.props.book.reviewer ? this.props.book.reviewer : null;
    return book && reviewer ? (
      this.renderBook(book, reviewer)
    ) : (
      <div>No book found</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.books,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    { getBookWithReviewer, clearBookWithReviewer },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookViewContainer);
