import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const openProfile = () => {
        setLoading(true)
        navigate('/profile')
        setLoading(false)
    }

    return (
        <div className="Navbar">
            {loading && <Loading />}
            <span className="title">Happy Chatting</span>
            <div className="user">
                <img onClick={openProfile} src={currentUser.photoURL} alt="User Profile" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;