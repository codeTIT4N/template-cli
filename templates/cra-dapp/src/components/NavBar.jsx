import { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Button,
  OverlayTrigger,
  Image,
  Tooltip,
} from "react-bootstrap";
import { BlockChainContext } from "../context/BlockchainContext";
import copy from "../assets/copy.svg";

function NavBar() {
  const { connect, walletAddress } = useContext(BlockChainContext);
  const [toolTipContent, setToolTipContent] = useState("Copy to Clipboard");

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CRA dApp</Navbar.Brand>
        {walletAddress ? (
          <>
            <Navbar.Text>
              {walletAddress}
              <span> </span>
              <OverlayTrigger
                overlay={<Tooltip>{toolTipContent}</Tooltip>}
                placement="bottom"
              >
                <Image
                  src={copy}
                  alt="copy"
                  style={{ cursor: "pointer", paddingBottom: "5px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    setToolTipContent("Copied!");
                    setTimeout(() => {
                      setToolTipContent("Copy to Clipboard");
                    }, 1000);
                  }}
                />
              </OverlayTrigger>
            </Navbar.Text>
          </>
        ) : (
          <Button variant="outline-info" onClick={connect}>
            Connect Wallet
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
