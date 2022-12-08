import { doc, getDoc } from "@firebase/firestore";
import { createContext, useContext, useReducer } from "react";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const currentChatId = null;
   

    const { currentUser } = useContext(AuthContext);
    const chatReducer = (state, action) => {
        async function getDocuments() {
            const docRef = doc(db, "chats", currentUser + action.payload.uid)
            const docRef2 = doc(db, "chats", action.payload.uid + currentUser)
            const docSnap = await getDoc(docRef);
            const docSnap2 = await getDoc(docRef2);
            if (docSnap.exists()) {
                 currentChatId = currentUser + action.payload.uid
            }
            else if (docSnap2.exists()) {
                 currentChatId = action.payload.uid + currentUser
            }
        }
        getDocuments()
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentChatId
                };

            default:
                return state;
        }

    }



    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}