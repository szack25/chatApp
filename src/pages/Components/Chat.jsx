import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import Bar from "./Bar";
import { ChatContext } from "../../Context/ChatContext";

const Chat = () => {
    const {data} = useContext(ChatContext)
    return (
        <div className="Chat">
            <div className="chatInfo">
                {data.user.uid ? <Bar /> : null}
                <Messages />
                <Input />
            </div>
        </div>
    )
}

export default Chat;