import React, { useContext, useState } from "react";
import Img from "../../Image/img.png";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactLoading from "react-loading";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKey = e => {
    e.code === "Enter" && handleSend()
  }

  const handleSend = async () => {
    setLoading(true);
    const trimmedText = text.trim();

    if (!trimmedText) {
      setLoading(false)
      return
    }

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });


    setText("");
    setImg(null);
    setLoading(false);
  };
  return (
    <div className={isLoading ? `bg-gray pageContainer` : null}>
      {isLoading && <ReactLoading  height={'10%'} width={'10%'} type={"spin"} />}
      <div className="input">
        <input
          type="text"
          placeholder="Write your message here"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKey}
        />
        <div className="send">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Input;