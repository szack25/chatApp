import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = ({message}) => {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])
    
    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && `owner`}`}>
            <div className="messageInfo">
                
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span className="displayName">{message.senderId === currentUser.uid ? currentUser.displayName : data.user.displayName}</span>
                {/* <span className="timestamp">{message.date}</span>          */}
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;