import React from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ userObj }) => {
  return (
    <div className="py-3 bg-slate-300 px-4">
      <ul className="flex justify-between font-bold">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}님의 Mypage</Link>
        </li>
      </ul>
    </div>
  );
};
