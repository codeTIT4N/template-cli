import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EthGif from "./assets/eth-logo-animated.gif";

function App() {
  return (
    <div className="App">
      <NavBar />
      <img src={EthGif} alt="ETH gif" />
      <Footer />
    </div>
  );
}

export default App;
