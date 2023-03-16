import { Button, Input, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { GroupIcon } from "./Icons";
import UserList from "./UserList";

const CreateGroup = () => {
  const { user } = ChatState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const searchUserList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/v1/user?search=${searchValue}`,
        config
      );

      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div onClick={showModal}>
        <GroupIcon />
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <h1 className="p-5 text-2xl text-center">Create Group</h1>
        <div className="flex mr-6">
          <Input
            placeholder="Search user to add"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-8"
          ></Input>
          <Button onClick={searchUserList}>Search</Button>
        </div>
        <div className="h-[360px] mr-6 overflow-auto mt-2">
          {<UserList searchResult={searchResult} />}
        </div>
      </Modal>
    </>
  );
};

export default CreateGroup;
