import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../WidgetsUI/Input";
import { getBook, updateReview, deleteReview, clearReview } from "../actions";
import { bindActionCreators } from "redux";

class EditReview extends Component {
  state = {
    name: {
      value: "",
      config: {
        type: "text",
        placeholder: "Enter Name",
      },
    },
    author: {
      value: "",
      config: {
        type: "text",
        placeholder: "Enter Author",
      },
    },
    review: {
      value: "",
      config: {
        type: "textarea",
        placeholder: "Enter Review",
      },
    },
    pages: {
      value: "",
      config: {
        type: "number",
      },
      label: "Pages:",
    },
    rating: {
      value: 1,
      config: {
        type: "select",
      },
      options: [1, 2, 3, 4, 5],
      label: "Rating:",
    },
    price: {
      value: "",
      config: {
        type: "number",
      },
      label: "Price:",
    },
    error: "",
    setInitialBook: false,
  };

  componentWillMount() {
    this.props.getBook(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearReview();
  }

  handleInputChange = (event, input) => {
    input.value = event.target.value;
    this.setState({ input });
  };

  editReview = (e) => {
    e.preventDefault();
    let submit = true;
    Object.entries(this.state).forEach((input) => {
      if (input[1].value === "") {
        submit = false;
      }
    });
    if (submit) {
      this.props.updateReview(
        this.props.bookData.book._id,
        this.state.name.value,
        this.state.author.value,
        this.state.review.value,
        this.state.pages.value,
        this.state.rating.value,
        this.state.price.value
      );
    } else {
      this.setState({ error: "All Fields Required" });
    }
  };

  deleteReview = () => {
    this.props.deleteReview(this.props.bookData.book._id);
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.setInitialBook) {
      this.setState({
        name: { ...this.state.name, value: nextProps.bookData.book.name },
        author: { ...this.state.author, value: nextProps.bookData.book.author },
        review: { ...this.state.review, value: nextProps.bookData.book.review },
        rating: { ...this.state.rating, value: nextProps.bookData.book.rating },
        price: { ...this.state.price, value: nextProps.bookData.book.price },
        pages: { ...this.state.pages, value: nextProps.bookData.book.pages },
        setInitialBook: true,
      });
    }
    if (nextProps.bookData.review) {
      if (nextProps.bookData.review.edit)
        this.props.history.push(`/books/${nextProps.bookData.review.bookId}`);
      else if (nextProps.bookData.review.delete) {
        setTimeout(() => this.props.history.push("/user/user-reviews"), 2000);
      } else this.setState({ error: "Something Went Wrong. Try Again" });
    }
  }

  renderForm() {
    return (
      <div className="add-review-form-container">
        {this.props.bookData.review ? (
          this.props.bookData.review.delete ? (
            <div className="del-message">Post deleted. Redirecting you....</div>
          ) : null
        ) : null}
        <form onSubmit={this.editReview}>
          <h2>Edit Review</h2>
          <div className="form-input-full">
            <Input
              {...this.state.name}
              onchange={(event) =>
                this.handleInputChange(event, this.state.name)
              }
            />
            <Input
              {...this.state.author}
              onchange={(event) =>
                this.handleInputChange(event, this.state.author)
              }
            />
          </div>
          <Input
            {...this.state.review}
            onchange={(event) =>
              this.handleInputChange(event, this.state.review)
            }
          />
          <div className="add-book-info">
            <div className="add-rating">
              <Input
                {...this.state.rating}
                onchange={(event) =>
                  this.handleInputChange(event, this.state.rating)
                }
              />
            </div>
            <div className="add-pages">
              <Input
                {...this.state.pages}
                onchange={(event) =>
                  this.handleInputChange(event, this.state.pages)
                }
              />
            </div>
            <div className="add-price">
              <Input
                {...this.state.price}
                onchange={(event) =>
                  this.handleInputChange(event, this.state.price)
                }
              />
            </div>
          </div>
          <div className="edit-review-buttons">
            <button type="submit" className="edit-review-submit">
              Edit Review
            </button>
            <button
              type="button"
              onClick={this.deleteReview}
              className="delete-review-submit"
            >
              Delete
            </button>
          </div>
          <div className="error">{this.state.error}</div>
        </form>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

const mapStateToProps = (state) => ({
  bookData: state.books,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    { getBook, updateReview, deleteReview, clearReview },
    dispatch
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditReview);
