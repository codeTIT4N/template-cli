import "./App.css";
//import { useContext } from "react";
//import { BlockChainContext } from "./context/BlockchainContext";
import NavBar from "./components/NavBar";

function App() {
  // const { connect, walletAddress } = useContext(BlockChainContext);

  return (
    <div className="App">
      <NavBar />
      <h2>CRA dApp</h2>
    </div>
  );
}

export default App;
