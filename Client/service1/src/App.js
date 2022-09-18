import logo from "./logo.svg";
import "./App.css";
import { MenuAppBar } from "./Components";
import { Container } from "@mui/material";
import { socket } from "./utlls/socket";
import { useEffect, useState } from "react";
function App() {
  const [TextSocket,SetTextSocket]=useState("");
  useEffect(() => {
    socket.on("pass_text", (message) => {
      console.log(message);
      SetTextSocket(message);
    });
  }, [socket]);
  return (
    <>
      <MenuAppBar />
      <Container>
        <p>
          {TextSocket}
        </p>
      </Container>
    </>
  );
}

export default App;
