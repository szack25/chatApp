import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import Bar from "./Bar";
import Welcome from "./Welcome";
import { ChatContext } from "../../Context/ChatContext";

const Chat = () => {
    const {data} = useContext(ChatContext)
    return (
        <div className="Chat">
            <div className="chatInfo">
                {data.user.uid ? <Bar /> : null}
                {data.user.uid ? <Messages /> : <Welcome />}
                {data.user.uid ? <Input />: null}
            </div>
        </div>
    )
}

export default Chat;