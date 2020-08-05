const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: MONGODB_URI,
  },
  default: {
    SECRET: "SUPERSECRETPASSWORD123",
    DATABASE: "mongodb://localhost:27017/bookShelf",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
