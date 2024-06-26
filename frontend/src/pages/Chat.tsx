import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import Chatitem from "../coomponent/chat/Chatitem";
import { IoMdSend } from "react-icons/io";
import { useRef, useState } from "react";
import { SendChatRequest } from "../helpers/api-communicator";
type Messages={
  role:"user"| "assistant";
  content: string;
}
const Chat = () => {
 const inputRef=useRef<HTMLInputElement | null>(null)
 const [messages,setmessages]=useState<Messages []>([])
  const HandleSubmit=async()=>{
console.log(inputRef.current?.value);
const content=inputRef.current?.value as string;
if(inputRef && inputRef.current)
  {
    inputRef.current.value="";

  }
  const newMessage:Messages={role:"user",content};
  setmessages((prev)=>[...prev,newMessage])
  //
  const chatData=await SendChatRequest(content);
  setmessages([...chatData.chats]);
  

  }
  // const chatMessages = [
  //   {
  //     role: "user",
  //     content: "Hello, how are you?",
  //   },
  //   {
  //     role: "assistant",
  //     content: "I'm doing well, thank you! How can I assist you today?",
  //   },
  //   {
  //     role: "user",
  //     content: "I need help with some programming concepts.",
  //   },
  //   {
  //     role: "assistant",
  //     content: "Of course! What specifically would you like to know?",
  //   },
  //   {
  //     role: "user",
  //     content: "Can you explain recursion to me?",
  //   },
  //   {
  //     role: "assistant",
  //     content:
  //       "Certainly! Recursion is a programming technique where a function calls itself in order to solve smaller instances of a problem.",
  //   },
  // ];

  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split("")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask a question related to knowledge, Buisness, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              hover: {
                bgcolor: red.A400,
              },
            }}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model-GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            overflowY: "auto",
          }}
        >
          {messages?.map((chat, index) => (
            //@ts-ignore
            <Chatitem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginRight: "auto",
          }}
        >
          <input
            type="text"

            ref={inputRef}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={HandleSubmit} sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
