import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="container">
                <Navbar />
                <Search />
                <Chats />
            </div>
        </div>
    )
}

export default Sidebar;