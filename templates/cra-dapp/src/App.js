import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

function App() {
  const [loader, setLoader] = useState(false);
  const [currentAddress, setAddress] = useState(null);
  const [showConnect, setShowConnect] = useState(false);
  const [chainId, setChainId] = useState(null);
  const [input, setInput] = useState(null);

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    window.ethereum.on("chainChanged", async function (accounts) {
      window.location.reload();
    });
  }, []);
  useEffect(() => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      window.location.reload();
    });
  }, []);

  const loadWeb3 = async () => {
    setLoader(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      // find chain id
      setChainId(Number(network.chainId));
      console.log(network);
      //const signer = await provider.getSigner();
      //setAddress(signer.address);
      setShowConnect(false);
    } catch (err) {
      console.log(err);
      setShowConnect(true);
    }
    setLoader(false);
  };
  const connect = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      setLoader(true);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
      } catch (err) {
        console.log(err);
      }
    }
    setLoader(false);
  };

  return (
    <div className="App">
      <h1>React App</h1>
      <button onClick={connect}>Connect</button>
    </div>
  );
}

export default App;
