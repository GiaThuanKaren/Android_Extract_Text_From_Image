import logo from "./logo.svg";
import "./App.css";
import { MenuAppBar } from "./Components";
import { Container } from "@mui/material";
import { socket } from "./utlls/socket";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    socket.on("send-text", (message) => {
      console.log(message);
    });
  }, [socket]);
  return (
    <>
      <MenuAppBar />
      <Container>{/* <h3>ahskjldh</h3> */}</Container>
    </>
  );
}

export default App;
