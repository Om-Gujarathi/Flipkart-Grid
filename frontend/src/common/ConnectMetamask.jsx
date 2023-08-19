import React from "react";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ethers } from "ethers";
import axios from "axios";
import API_END_POINT from "../../utility";
import { useRecoilState, useSetRecoilState } from "recoil";
import walletState from "../recoil/WalletState";

function ConnectMetamask() {
  const [connButtonText, setConnButtonText] = React.useState("Connect Wallet");
  const [open, setOpen] = React.useState(false);
  const [userBalance, setUserBalance] = React.useState(null);
  const [defaultAccount, setDefaultAccount] = useRecoilState(walletState);

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
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const getUserBalance = (account) => {
    fetch(`${API_END_POINT}/users/getBalance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: account,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserBalance(data.balance.displayValue);
        setConnButtonText(`Balance : ${data.balance.displayValue}`);
      });
  };

  // const getUserBalance = (account) => {
  //   window.ethereum
  //     .request({ method: "eth_getBalance", params: [account, "latest"] })
  //     .then((balance) => {
  //       setUserBalance(ethers.utils.formatEther(balance));
  //       setConnButtonText(`Balance : ${ethers.utils.formatEther(balance)}`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
          backgroundColor: "#FB641B",
          borderRadius: "0px",
          height: "40px",
          fontWeight: "500",
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
