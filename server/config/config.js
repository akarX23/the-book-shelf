const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "SUPERSECRETPASSWORD123",
    DATABASE: "mongodb://localhost:27017/bookShelf",
  },
};

exports.get = function get(env) {
  console.log(env);
  return config[env] || config.default;
};
