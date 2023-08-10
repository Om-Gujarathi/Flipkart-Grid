import React from "react";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ethers } from "ethers";

function ConnectMetamask() {
  const [connButtonText, setConnButtonText] = React.useState("Connect Wallet!");
  const [open, setOpen] = React.useState(false);
  const [userBalance, setUserBalance] = React.useState(null);
  const [defaultAccount, setDefaultAccount] = React.useState(null);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
        });
    } else {
      handleClick();
    }
  };

  const accountChangedHandler = (newAccount) => {
    console.log(newAccount);
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const getUserBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance));
        setConnButtonText(`Balance : ${ethers.formatEther(balance)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 100,
          backgroundColor: "white",
          color: "red",
          height: "40px",
          fontWeight: "700",
        }}
        disableElevation
        size="small"
        onClick={() => {
          connectWalletHandler();
        }}
      >
        {connButtonText}
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please Install MetaMask!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ConnectMetamask;