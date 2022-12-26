import React, { useContext, useState } from "react";
import Add from "../../Image/addAvatar.png";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "./Loading";

const Profile = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const currentUser = useContext(AuthContext);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const file = e.target[1].files[0]; 


        try {
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(currentUser.uid, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //update user on firestore
                        await updateDoc(doc(db, "users", currentUser.uid), {
                            displayName,
                            photoURL: downloadURL,
                        });
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
        navigate("/");
    };

    return (
        <div className="Profile">
            {loading && <Loading />}
            <div className="user">
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="title">Profile</span>
                    <form onSubmit={handleSubmit}>
                        <input required type="text" placeholder={auth.currentUser.displayName ? auth.currentUser.displayName : "Display Name"} />
                        <input required style={{ display: "none" }} type="file" id="file" />
                        <label htmlFor="file">
                            <img src={Add} alt="" />
                            <span>Update your profile picture</span>
                        </label>
                        <button disabled={loading}>Update Account</button>
                        {loading && "Uploading and compressing the image please wait..."}
                        {err && <span>Something went wrong</span>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;