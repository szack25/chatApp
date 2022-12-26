import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Welcome = () => {

    const {currentUser} = useContext(AuthContext)
    return (
        <div className="Welcome">
            <h2>Welcome {currentUser.displayName},</h2>
            <p>Use the sidebar to navigate to a user to send messages to or search for a user's name in the search bar!</p>
        </div>
    )
}

export default Welcome;