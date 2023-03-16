import { Avatar, Collapse } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import React from "react";
import { getSender, getSenderFull } from "../config/handleLogic";
import { ChatState } from "../context/ChatProvider";
import DetailItem from "./DetailItem";
import {
  AddUserIcon,
  DocumentIcon,
  LeaveGroupIcon,
  MsgIcon,
  PhotoIcon,
  RemoveUserIcon,
} from "./Icons";

import UserItem from "./UserItem";

const ChatDetail = ({ showChatDetail }) => {
  const { user, selectedChat } = ChatState();

  if (!selectedChat) {
    return;
  }

  return (
    <div
      className="flex-1 flex flex-col overflow-auto"
      style={{ display: showChatDetail ? "flex" : "none" }}
    >
      <div className="mt-10 w-full h-40 block">
        {selectedChat.isGroupChat ? (
          <Avatar src={selectedChat.groupAvatar} className="w-20 h-20" />
        ) : (
          <div className="flex justify-center">
            <Avatar
              src={getSenderFull(user, selectedChat.users).avatar}
              className="w-20 h-20"
            />
          </div>
        )}
        {selectedChat.isGroupChat ? (
          <div className="text-center font-medium text-lg">
            {selectedChat.chatName}
          </div>
        ) : (
          <div className="text-center font-medium text-lg">
            {getSender(user, selectedChat.users)}
          </div>
        )}
      </div>
      <div>
        <Collapse
          bordered={false}
          ghost={true}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <CaretUpOutlined
              rotate={isActive ? 0 : 180}
              style={{ fontSize: "18px" }}
            />
          )}
        >
          <Collapse.Panel
            header="Customize chat"
            key="1"
            className="text-base font-semibold"
          >
            <DetailItem
              icon={<MsgIcon />}
              isFirst={true}
              title="Change chat name"
            />
            <DetailItem icon={<PhotoIcon />} title="Change photo" />
          </Collapse.Panel>
          <Collapse.Panel
            header="Group options"
            className="text-base font-semibold"
            key="2"
          >
            <DetailItem
              icon={<AddUserIcon />}
              isFirst={true}
              title="Add member"
            />
            <DetailItem icon={<RemoveUserIcon />} title="Remove member" />
          </Collapse.Panel>
          <Collapse.Panel
            header="Chat members"
            className="text-base font-semibold"
            key="3"
          >
            <UserItem />
          </Collapse.Panel>
          <Collapse.Panel
            header="Media files"
            className="text-base font-semibold"
            key="4"
          >
            <DetailItem icon={<PhotoIcon />} isFirst={true} title="Media" />
            <DetailItem icon={<DocumentIcon />} title="Files" />
          </Collapse.Panel>
        </Collapse>
        <DetailItem icon={<LeaveGroupIcon />} title="Leave group" isLeave />
      </div>
    </div>
  );
};

export default ChatDetail;
