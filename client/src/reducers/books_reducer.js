export default function (state = {}, action) {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        list: action.payload,
      };
    case "GET_BOOK_W_REVIEWER":
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer,
      };
    case "CLEAR_BOOK_W_REVIEWER":
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer,
      };
    case "ADD_REVIEW":
      return { ...state, review: action.payload };
    case "CLEAR_REVIEW":
      return { ...state, review: action.payload };
    case "USER_REVIEWs":
      return { ...state, user_reviews: action.payload };
    case "GET_BOOK":
      return {
        ...state,
        book: action.payload,
      };
    case "EDIT_REVIEW":
      return {
        ...state,
        review: action.payload,
      };
    case "DELETE_REVIEW":
      return {
        ...state,
        review: action.payload,
      };
    default:
      return state;
  }
}
