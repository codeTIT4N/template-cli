// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ERC721.sol";

// To run only these test: `forge test --match-contract FoundryToken`
contract FoundryTokenTest is Test {
    FoundryToken contract721;
    //creating new users for testing
    address ankit = address(0x1);
    address bhuvan = address(0x2);

    function setUp() public {
        contract721 = new FoundryToken();
    }

    // simple mint test
    function testMint() public {
        contract721.safeMint(ankit);
        address ownerOf = contract721.ownerOf(0);
        assertEq(ankit, ownerOf);
    }

    // user impersonation for testing contracts using vm.startPrank
    function testTransfer() public {
        contract721.safeMint(ankit);
        vm.startPrank(ankit); //changes msg.sender
        contract721.safeTransferFrom(ankit, bhuvan, 0);

        address ownerOf = contract721.ownerOf(0);
        assertEq(bhuvan, ownerOf);
    }
}
