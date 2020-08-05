import React from "react";

const User = (props) => {
  let user = props.user.login;
  return (
    <div className="user-container">
      <div className="avatar"></div>
      <div className="info">
        <div>
          <span>Name: </span>
          {user.name}
        </div>
        <div>
          <span>Last Name: </span>
          {user.lastName}
        </div>
        <div>
          <span>Email: </span>
          {user.email}
        </div>
      </div>
    </div>
  );
};

export default User;
