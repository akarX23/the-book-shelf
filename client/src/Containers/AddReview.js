import React, { Component } from "react";
import { connect } from "react-redux";
import { addReview, clearReview } from "../actions";
import { bindActionCreators } from "redux";
import Input from "../WidgetsUI/Input";

class AddReview extends Component {
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
      value: "1",
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
  };

  componentWillUnmount() {
    this.props.clearReview();
  }

  handleInputChange = (event, input) => {
    input.value = event.target.value;
    this.setState({ input });
  };

  submitForm = (e) => {
    e.preventDefault();
    let submit = true;
    Object.entries(this.state).forEach((input) => {
      if (input[1].value === "") {
        submit = false;
      }
    });
    if (submit) {
      this.props.addReview(
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.review.review.post)
      this.props.history.push(`/books/${nextProps.review.review.bookId}`);
    else this.setState({ error: "Could Not Upload Book. Try Again" });
  }

  renderForm() {
    return (
      <div className="add-review-form">
        <form onSubmit={this.submitForm}>
          <Input
            {...this.state.name}
            onchange={(event) => this.handleInputChange(event, this.state.name)}
          />
          <Input
            {...this.state.author}
            onchange={(event) =>
              this.handleInputChange(event, this.state.author)
            }
          />
          <Input
            {...this.state.review}
            onchange={(event) =>
              this.handleInputChange(event, this.state.review)
            }
          />
          <div className="add-review-info">
            <Input
              {...this.state.rating}
              onchange={(event) =>
                this.handleInputChange(event, this.state.rating)
              }
            />

            <Input
              {...this.state.pages}
              onchange={(event) =>
                this.handleInputChange(event, this.state.pages)
              }
            />

            <Input
              {...this.state.price}
              onchange={(event) =>
                this.handleInputChange(event, this.state.price)
              }
            />
          </div>

          <button type="submit" className="add-review-submit">
            Post Review
          </button>
          <div className="error">{this.state.error}</div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="add-review-container">
        <h2>Add Review</h2>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  review: state.books,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ addReview, clearReview }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
