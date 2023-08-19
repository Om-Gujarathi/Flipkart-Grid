import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 100,
          backgroundColor: "white",
          color: "#2874f0",
          height: "40px",
          fontWeight: "700",
        }}
        disableElevation
        size="small"
        onClick={() => {
          handleOpen();
        }}
      >
        Login
      </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <Login></Login>
          </div>
        </Modal>
    </div>
  );
}
