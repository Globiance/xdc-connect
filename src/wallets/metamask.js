import Xdc3 from "xdc3";
import detectEthereumProvider from "@metamask/detect-provider";
import _ from "lodash";

import { GetRevertReason, IsJsonRpcError } from "../helpers/crypto";
import {
  CHAIN_DATA,
  HTTP_PROVIDER,
  LOADERS,
  XDC_PAY,
  WALLET_CONNECT,
  METAMASK,
  DEFAULT_CHAIN_ID,
  NETWORK_NAME,
} from "../helpers/constant";

import * as actions from "../actions";
import store from "../redux/store";
import { toast } from "react-toastify";
import { GetBrowser } from "../helpers/miscellaneous";

export function IsXdc3Supported() {
  return Boolean(window.ethereum);
}

export async function GetProvider() {
  const provider = await detectEthereumProvider();
  return provider;
}

export const MainnetProvider = () => {
  return new Xdc3.providers.HttpProvider(HTTP_PROVIDER[50]);
};

export const ApothemProvider = () => {
  return new Xdc3.providers.HttpProvider(HTTP_PROVIDER[50]);
};

export async function GetChainId() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  return parseInt(chainId);
}

export async function initMetamask(chainId = DEFAULT_CHAIN_ID) {
  try {
    const link = GetLink();

    if (!link) {
      toast(
        <div>
          Metamask not available in the browser. Please use Firefox or Chrome.
        </div>,
        {
          autoClose: false,
        }
      );
      return store.dispatch(actions.WalletDisconnected());
    }

    if (!window.ethereum) {
      toast(
        <div>
          Metamask not available in the browser. Please refer{" "}
          <a href={link}>here</a>
        </div>,
        {
          autoClose: false,
        }
      );
      return store.dispatch(actions.WalletDisconnected());
    }

    const currentProvider = await GetCurrentProvider();

    if (currentProvider !== "metamask") {
      toast(
        <div>
          Metamask not available in the browser. Maybe you are using multiple
          wallets?
        </div>,
        {
          autoClose: false,
        }
      );
      return store.dispatch(actions.WalletDisconnected());
    }

    // init listeners

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async (accounts) => {
        try {
          // connected
          const chainIdHex = Xdc3.utils.toHex(chainId);

          const swth = await switchToXdc(chainIdHex);

          if (!swth) {
            toast(<div>Error while switching network </div>, {
              autoClose: false,
            });
          }

          const chain_id = parseInt(
            await window.ethereum.request({
              method: "eth_chainId",
            })
          );
          if (accounts.length === 0) {
            console.log("no accounts connected");
            return store.dispatch(actions.WalletDisconnected());
          }

          return store.dispatch(
            actions.WalletConnected({
              address: accounts[0],
              chain_id,
              loader: LOADERS.Metamask,
              explorer: CHAIN_DATA[chain_id],
            })
          );
        } catch (e) {
          console.log("e", e);
        }
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });

    window.ethereum.on("accountsChanged", async (accounts) => {
      if (!accounts || accounts.length === 0) {
        console.log("no accounts connected");
        return store.dispatch(actions.WalletDisconnected());
      }

      store.dispatch(actions.AccountChanged(accounts[0]));
    });

    window.ethereum.on("chainChanged", async (chainId) => {
      store.dispatch(actions.NetworkChanged(parseInt(chainId)));
    });

    window.ethereum.on("connect", async (chainIdHex) => {
      try {
        const chain_id = parseInt(chainIdHex);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (!accounts || accounts.length === 0) {
          console.log("no accounts connected");
          return store.dispatch(actions.WalletDisconnected());
        }

        return store.dispatch(
          actions.WalletConnected({
            address: accounts[0],
            chain_id,
            loader: LOADERS.Metamask,
            explorer: CHAIN_DATA[chain_id],
          })
        );
      } catch (e) {
        console.log(e);
      }
    });

    window.ethereum.on("disconnect", (data) => {
      console.log("disconnect", data);
      return store.dispatch(actions.WalletDisconnected());
    });
  } catch (e) {
    console.log(e);
    toast(<div>Error while connecting to Metamask provider</div>, {
      autoClose: false,
    });
    return store.dispatch(actions.WalletDisconnected());
  }
}

export function SendTransaction(tx) {
  if (tx.value) {
    tx.value = Xdc3.utils.toHex(tx.value);
  }

  if (tx.gas) {
    tx.gas = Xdc3.utils.toHex(tx.gas);
  }

  if (tx.gasPrice) {
    tx.gasPrice = Xdc3.utils.toHex(tx.gasPrice);
  }

  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [tx],
      })
      .then((hash) => {
        resolve({ transactionHash: hash });
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function CallTransaction(tx) {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: "eth_call",
        params: [tx],
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export async function GetCurrentProvider() {
  if (IsXdc3Supported() !== true) return null;

  if (window.ethereum.isMetaMask) {
    return "metamask";
  }
  return "unknown";
}

export const GetNativeBalance = (address) => {
  return window.ethereum.request({ method: "eth_chainId", params: [address] });
};

// internal

async function switchToXdc(chainId = "0x32") {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    return true;
  } catch (switchError) {
    console.log("switchError", switchError);
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId,
              chainName: NETWORK_NAME[parseInt(chainId)],
              rpcUrls: [HTTP_PROVIDER[parseInt(chainId)]] /* ... */,
            },
          ],
        });
        return true;
      } catch (addError) {
        console.log("addError", addError);
        return false;
      }
    } else {
      return false;
    }
  }
}

function GetLink() {
  const browser = GetBrowser();

  if (browser === "Chrome") {
    return "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
  }

  if (browser === "Firefox") {
    return "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
  }

  return null;
}

export async function Disconnect() {
  const provider = await GetProvider();
  let xdc3 = new Xdc3(provider);
  return xdc3.eth.currentProvider.disconnect;
}
