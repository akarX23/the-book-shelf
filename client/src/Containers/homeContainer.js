import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks } from "../actions/index";
import BookItem from "../WidgetsUI/BookItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getBooks(2, 0, "desc"));
  }

  renderItems = (books) => {
    return books.list
      ? books.list.map((item) => (
          <CSSTransition classNames="book_item" timeout={1000} key={item._id}>
            <BookItem {...item} />
          </CSSTransition>
        ))
      : null;
  };

  loadMore = () => {
    let count = this.props.books.list.length;
    this.props.dispatch(getBooks(2, count, "desc", this.props.books.list));
  };

  render() {
    return (
      <div>
        <TransitionGroup component="div" className="list">
          {this.renderItems(this.props.books)}
        </TransitionGroup>

        <div className="loadmore" onClick={this.loadMore}>
          Load More Books
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(HomeContainer);
