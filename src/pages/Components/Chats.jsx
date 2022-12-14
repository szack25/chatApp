import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            })
            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats()
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }
    return (
        <div className="Chats">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <div className="userChatInfo">
                        <img className="owner-image" src={chat[1].userInfo.photoURL} alt="" />
                        <span>{chat[1].userInfo.displayName}</span>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Chats;