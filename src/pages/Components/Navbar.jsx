import React from "react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext)
    return (
        <div className="Navbar">
            <span className="title">Happy Chatting</span>
            <div className="user">
                <img src={currentUser.photoUrl} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;