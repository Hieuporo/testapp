import Header from "../components/Header";
import MyChats from "../components/MyChats";
import SingleChat from "../components/SingleChat";
import NavigationBar from "../components/NavigationBar";
import { ChatState } from "../context/ChatProvider";
import { useState } from "react";

const Home = () => {
  const { user } = ChatState();
  const [page, setPage] = useState("chat");

  return (
    <div>
      {user && <Header />}
      {user && (
        <div className="flex h-vh">
          <NavigationBar setPage={setPage} />
          {page === "chat" && (
            <>
              <MyChats />
              <SingleChat />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
