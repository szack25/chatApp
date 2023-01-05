import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../firebase";

const Search = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username[0].toUpperCase() + username.substring(1)))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (err) {
            setErr(true)
        }
    }
    const handleKey = e => {
        e.code === "Enter" && handleSearch()
    }
    const handleSelect = async () => {
        const combinedId = 
            currentUser.uid.length > user.uid.length
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null);
        setUsername("");
    };
    return (
        <div className="Search">
            <div className="searchForm">
                <input onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Find a User" />
            </div>
            {err && <span>No user matches that name</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search;