import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { ReactLoading } from "react-loading";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true);
        }
        setLoading(false)
    }

    return (
        <div className="pageContainer">
            {isLoading && <ReactLoading className="loading" height={'10%'} width={'10%'} color={'#A9A9A9'} type={"spin"} />}
            {isLoading === false &&
                <div className="formContainer">
                    <div className="formWrapper">
                        <span className="pageTitle title">Login</span>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" id="email" />
                            <input type="password" placeholder="Password" id="password" />
                            <button>Sign In</button>
                            {err && <span>Something went wrong</span>}
                        </form>
                        <p className="noAccount">You don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login;