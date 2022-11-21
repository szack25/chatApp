import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="Chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <Messages />
                <Input />
            </div>
        </div>
    )
}

export default Chat;