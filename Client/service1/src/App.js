import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import { MenuAppBar } from "./Components";
import { Container, Typography } from "@mui/material";
import { socket } from "./utlls/socket";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Modal from "@mui/material/Modal";
import { Generate_code } from "./utlls/generate_code";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [TextSocket, SetTextSocket] = useState("");
  const CodeID =Generate_code();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleJoinRoom = ()=>{
    socket.emit("join-room",CodeID)
    setOpen(false);
  }
  useEffect(() => {
    socket.on("pass_text", (message) => {
      console.log(message);
      SetTextSocket(message);
    });
  }, [socket]);
  return (
    <>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`Join with this id ${CodeID}`}
            </Typography>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button onClick={handleJoinRoom}>Join</Button>
              <Button onClick={handleClose}>Close</Button>
            </ButtonGroup>
          </Box>
        </Modal>
      </div>

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
