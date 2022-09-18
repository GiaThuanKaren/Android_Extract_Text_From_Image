import logo from "./logo.svg";
import "./App.css";
import { MenuAppBar } from "./Components";
import { Container, Typography } from "@mui/material";
import { socket } from "./utlls/socket";
import { useEffect, useState } from "react";
function App() {
  const [TextSocket, SetTextSocket] = useState("");
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
        <Typography fontWeight={500} style={{ whiteSpace: "pre-line" }}>
          {TextSocket}
        </Typography>
      </Container>
    </>
  );
}

export default App;
