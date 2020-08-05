const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE:
      "mongodb+srv://akarX:akarx1234@bookshelf.9s1vi.mongodb.net/bookshelf?retryWrites=true&w=majority",
  },
  default: {
    SECRET: "SUPERSECRETPASSWORD123",
    DATABASE: "mongodb://localhost:27017/bookShelf",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
