import { Avatar, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { getSender, getSenderFull } from "../config/handleLogic";
import { GroupIcon } from "./Icons";
import CreateGroup from "./CreateGroup";

const MyChats = () => {
  const { user, setSelectedChat, selectedChat, chats, setChats } = ChatState();

  const getListChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/v1/chat", config);
      setChats(data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  useEffect(() => {
    getListChat();
  }, []);

  return (
    <div className="basis-96 h-vh overflow-auto pl-3">
      <div className="flex justify-between items-center h-12 pr-4 font-bold">
        <h1 className="text-3xl">Chats</h1>
        <CreateGroup />
      </div>
      <div>
        {chats &&
          chats.map((chat, key) => {
            if (chat.latestMessage) {
              return (
                <div
                  className="flex mt-4 cursor-pointer"
                  key={key}
                  onClick={() => setSelectedChat(chat)}
                >
                  {chat.isGroupChat ? (
                    <Avatar
                      src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                      className="w-14 h-14"
                    />
                  ) : (
                    <Avatar
                      src={getSenderFull(user, chat.users).avatar}
                      className="w-14 h-14"
                    />
                  )}
                  <div className="ml-4">
                    {chat.isGroupChat ? (
                      <div className="font-medium text-lg">{chat.chatName}</div>
                    ) : (
                      <div className="font-medium text-lg">
                        {getSender(user, chat.users)}
                      </div>
                    )}

                    <div className="text-gray-600">
                      {chat.latestMessage.content}
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default MyChats;
