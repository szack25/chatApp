import React, { useState } from "react";
import Add from "../Image/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from "react-loading";

const Register = () => {
    const [err, setErr] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    let img;

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }

    };

    return (
        <div className="pageContainer">
            {isLoading && <ReactLoading className="loading" height={'10%'} width={'10%'} color={'#A9A9A9'} type={"spin"} />}
            {isLoading === false &&
                <div className="formContainer">
                    <div className="formWrapper">
                        <span className="title">Register</span>
                        <form onSubmit={handleSubmit}>
                            <input required type="text" placeholder="Display Name" />
                            <input required type="email" placeholder="Email" />
                            <input required type="password" placeholder="Password" />
                            <input style={{ display: "none" }} value={img} type="file" id="file" />
                            <label htmlFor="file">
                                <img src={Add} alt="" />
                                <span>Add an avatar</span>
                            </label>
                            <button disabled={isLoading}>Sign up</button>
                            {err && <span style={{ width: `270px`, textAlign: `center` }}>Something went wrong. Please try re-uploading the image or maybe you already made an account.</span>}
                        </form>
                        <p>
                            Have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Register;