import React from "react";
import { List, Avatar } from "antd";

const UserList = ({ searchResult, select }) => {
  return (
    <List className="user-box cursor-pointer mt-4">
      {searchResult &&
        searchResult.map((user, key) => (
          <li className="flex mt-4" key={key}>
            <Avatar src={user.avatar} className="w-14 h-14" />
            <div className="ml-4">
              <div className="font-medium text-base">{user.name}</div>
              <div>Email: {user.email}</div>
            </div>
          </li>
        ))}
    </List>
  );
};

export default UserList;
