import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            signInWithEmailAndPassword(auth, email, password);
            navigate("/login")
        } catch (err) {
            setErr(true);
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h1 className="pageTitle">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" id="" />
                    <input type="password" placeholder="Password" id="" />
                    <button>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p className="noAccount">You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;