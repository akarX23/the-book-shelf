export default function (state = {}, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, login: action.payload };
    case "USER_AUTH":
      return { ...state, login: action.payload };
    case "ADD_USER":
      return { ...state, user: action.payload };
    case "GET_USER_LIST":
      return { ...state, userList: action.payload };
    case "CLEAR_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, logout: action.payload };
    default:
      return state;
  }
}
