import { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { BlockChainContext } from "../context/BlockchainContext";

function NavBar() {
  const { connect, walletAddress } = useContext(BlockChainContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CRA dApp</Navbar.Brand>
        {walletAddress ? (
          <Navbar.Text>
            <span style={{ color: "wheat" }}>{walletAddress}</span>
          </Navbar.Text>
        ) : (
          <Button variant="outline-info" onClick={connect}>
            Connect Wallet
          </Button>
        )}
        // <span style={{ color: "wheat" }}></span>
      </Container>
    </Navbar>
  );
}

export default NavBar;