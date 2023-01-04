import React from "react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const openProfile = () => {
        navigate('/profile')
    }

    return (
            <div className="Navbar">
                <span className="title">Happy Chatting</span>
                <div className="user">
                    <img onClick={openProfile} src={currentUser.photoURL} alt="User Profile" />
                    <span>{currentUser.displayName}</span>
                    <button onClick={() => signOut(auth)}>Logout</button>
                </div>
            </div>
    )
}

export default Navbar;