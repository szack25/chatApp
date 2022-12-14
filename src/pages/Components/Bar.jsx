import React, { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";

const Bar = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className="Bar">
            <img src={data.user.photoURL} alt="" />
            <span>{data.user.displayName}</span>
        </div>
    )
}

export default Bar;