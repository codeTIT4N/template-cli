import { ethers } from "ethers";
const { createContext, useEffect, useState } = require("react");

export const BlockChainContext = createContext();
export function BlockChainContextProvider({ children }) {
  const [walletAddress, setAddress] = useState(undefined);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    if (window.ethereum != null) {
      window.ethereum.on("chainChanged", async function () {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum != null) {
      window.ethereum.on("accountsChanged", async function () {
        window.location.reload();
      });
    }
  }, []);

  const loadWeb3 = async () => {
    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
      const network = await prov.getNetwork();
      const chainId = network.chainId.toString();
      setChainId(chainId);
      let connectedAccounts = window.ethereum._state.accounts;
      if (connectedAccounts.length > 0) {
        setAddress(connectedAccounts[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function connect(e) {
    e.preventDefault();
    window.ethereum
      ? window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setAddress(accounts[0]);
            //toast.success("Wallet Connected Successfully");
          })
          .catch((error) => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              //toast.error("Please Connect Metamask!");
            } else {
              console.error(error);
              alert(error.message);
            }
          })
      : alert("Please install a web3 wallet like MetaMask!");
  }
  return (
    <BlockChainContext.Provider
      value={{ connect, walletAddress, provider, chainId }}
    >
      {children}
    </BlockChainContext.Provider>
  );
}
