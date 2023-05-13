// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/Greetings.sol";

contract GreetingsScript is Script {
    function setUp() public {}

    function run() public {
        //  this will deploy to the EVM
        vm.broadcast();
        new Greetings("Hello Foundry!");
    }
}
