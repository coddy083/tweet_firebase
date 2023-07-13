import React from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ userObj }) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}님의 프로필</Link>
        </li>
      </ul>
    </>
  );
};
