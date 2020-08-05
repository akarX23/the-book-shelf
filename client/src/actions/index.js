import axios from "axios";

export function getBooks(limit = 3, skip = 0, order = "asc", list = "") {
  const request = axios
    .get(`/api/books?limit=${limit}&skip=${skip}&order=${order}`)
    .then((response) => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: "GET_BOOKS",
    payload: request,
  };
}

export async function getBookWithReviewer(id) {
  const getBook = async () => {
    return axios.get("/api/getbook?id=" + id).then(({ data }) => {
      return data;
    });
  };

  const getReviewer = async (userid) => {
    return axios.get("/api/getReviewer?id=" + userid).then(({ data }) => {
      return data;
    });
  };

  const book = await getBook();
  const reviewer = await getReviewer(book.ownerId);

  return {
    type: "GET_BOOK_W_REVIEWER",
    payload: {
      book,
      reviewer,
    },
  };
}

export function clearBookWithReviewer() {
  return {
    type: "CLEAR_BOOK_W_REVIEWER",
    payload: {
      book: {},
      reviewer: {},
    },
  };
}

export async function getBook(id) {
  const book = await axios.get("/api/getbook?id=" + id).then(({ data }) => {
    return data;
  });

  return {
    type: "GET_BOOK",
    payload: book,
  };
}

//Login User

export async function loginUser(email, password) {
  const request = await axios
    .post("/api/user/login", { email, password })
    .then(({ data }) => {
      return data;
    });

  return {
    type: "USER_LOGIN",
    payload: request,
  };
}

export async function auth() {
  const request = await axios.get("/api/auth").then((response) => {
    return response.data;
  });

  return {
    type: "USER_AUTH",
    payload: request,
  };
}

//Add Review
export async function addReview(name, author, review, pages, rating, price) {
  const request = await axios
    .post("/api/book", {
      name,
      author,
      review,
      pages,
      rating,
      price,
    })
    .then((response) => response.data);

  return {
    type: "ADD_REVIEW",
    payload: request,
  };
}

export function clearReview() {
  return {
    type: "CLEAR_REVIEW",
    payload: null,
  };
}

export async function getMyReviews(id) {
  const request = await axios
    .get(`/api/user_posts?id=${id}`)
    .then((response) => response.data);

  return {
    type: "USER_REVIEWs",
    payload: request,
  };
}

export async function updateReview(
  _id,
  name,
  author,
  review,
  pages,
  rating,
  price
) {
  const request = await axios
    .post("/api/book_update", {
      _id,
      name,
      author,
      review,
      pages,
      rating,
      price,
    })
    .then((response) => response.data);

  return {
    type: "EDIT_REVIEW",
    payload: request,
  };
}

export async function deleteReview(id) {
  const request = await axios
    .delete(`/api/delete_book?id=${id}`)
    .then((response) => response.data);

  return {
    type: "DELETE_REVIEW",
    payload: request,
  };
}

export async function addUser(data) {
  const request = await axios
    .post("/api/register", data)
    .then((response) => response.data);

  return {
    type: "ADD_USER",
    payload: request,
  };
}

export async function getUserlist() {
  const request = await axios
    .get("/api/users")
    .then((response) => response.data);

  return {
    type: "GET_USER_LIST",
    payload: request,
  };
}

export function clearUser() {
  return {
    type: "CLEAR_USER",
    payload: null,
  };
}

export async function logoutUser() {
  const request = await axios
    .get("/api/user/logout")
    .then((response) => response.data);

  return {
    type: "LOGOUT_USER",
    payload: request,
  };
}
