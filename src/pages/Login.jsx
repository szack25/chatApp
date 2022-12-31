import { getRedirectResult, GithubAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import Loading from "./Components/Loading";
import { FaGithub } from "react-icons/fa";

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

    const GitHubLogin = () => {
        const provider = new GithubAuthProvider;
        provider.addScope('repo');
        signInWithRedirect(auth, provider);
        getRedirectResult(auth)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    const user = result.user;
                }
            }).catch((error) => {
                
            })
    }

    return (
        <div className="formContainer">
            {isLoading && <Loading />}
            <div className="formWrapper">
                <span className="pageTitle title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" id="email" />
                    <input type="password" placeholder="Password" id="password" />
                    <button>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <button className="gh-login" onClick={GitHubLogin}><span className="gh-logo"><FaGithub size="18" /></span>Login with Github</button>
                <p className="noAccount">You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;