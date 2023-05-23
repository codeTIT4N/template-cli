import "./App.css";
import NavBar from "./components/NavBar";
import EthGif from "./assets/eth-logo-animated.gif";

function App() {
  return (
    <div className="App">
      <NavBar />
      <img src={EthGif} alt="ETH gif" />
    </div>
  );
}

export default App;
