import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./RepliesBox.module.css";
import InputMessage from "../InputMessage/InputMessage";
import axios from "axios";
import { useSelector } from "react-redux";
import MessageWithData from "../MessageWithData/MessageWithData";
import { NotificationContext } from "../../../context/notificationContext";

function RepliesBox({ postId, incrementRepliesCount, postUserId }) {
  const [replies, setReplies] = useState(null);
  const [mood] = useState("");

  const user = useSelector((state) => state.user.user);

  const repliesWrapper = useRef();

  const { notificationWs } = useContext(NotificationContext)

  const handleSendReply = (reply) => {
    return new Promise((resolve, reject) => {
        const replyData = {
        userId: user?._id,
        postId,
        content: reply,
        mood
        };
        axios
        .post("/post/sendReply", replyData)
        .then((response) => {
            setReplies((replies) => [
            ...replies,
            response.data,
            ]);
            incrementRepliesCount?.()
            resolve()
            if(notificationWs.readyState === 1){
              notificationWs.send(JSON.stringify({data: {to: postUserId, on: postId}, type: "REPLY"}))
            }
        })
        .catch((error) => {
            console.log(error);
            reject()
        });
    })
  };

  useEffect(() => {
    axios
      .get(`/post/replies?postId=${postId}`)
      .then((response) => {
        setReplies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  return (
    <div className={styles.container}>
        <div className={styles["replies-wrapper"]} ref={repliesWrapper}>
        {
            replies ?
            replies.map((reply) => {
                return <MessageWithData {...reply} key={reply._id} wrapperElement={repliesWrapper}/>
            }) : ''
        }
        </div>
      <InputMessage onSend={handleSendReply}/>
    </div>
  );
}

export default RepliesBox;
