import "./App.css";
import { useContext } from "react";
import { BlockChainContext } from "./context/BlockchainContext";

function App() {
  const { connect, walletAddress } = useContext(BlockChainContext);

  console.log(walletAddress);

  return (
    <div className="App">
      <h2>React dApp</h2>
      {walletAddress ? (
        <h3>Wallet Address: {walletAddress}</h3>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  );
}

export default App;
