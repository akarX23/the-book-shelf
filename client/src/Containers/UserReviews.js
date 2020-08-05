import React, { Component } from "react";
import { connect } from "react-redux";
import { getMyReviews } from "../actions";
import { bindActionCreators } from "redux";
import Moment from "react-moment";

class UserReviews extends Component {
  componentWillMount() {
    this.props.getMyReviews(this.props.user.login.id);
  }

  fillTableWithData() {
    return this.props.reviews.user_reviews
      ? this.props.reviews.user_reviews.map((item, i) => {
          return (
            <tr key={i}>
              <td>
                <a href={`/user/edit-post/${item._id}`}>{item.name}</a>
              </td>
              <td>
                <a href={`/user/edit-post/${item._id}`}>{item.author}</a>
              </td>
              <td>
                <a href={`/user/edit-post/${item._id}`}>
                  <Moment date={item.createdAt} format="DD/MM/YYYY" />
                </a>
              </td>
            </tr>
          );
        })
      : null;
  }

  render() {
    return (
      <div className="user-reviews-container">
        <h1>Your Reviews</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.fillTableWithData()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reviews: state.books,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ getMyReviews }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
