// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Greetings.sol";

contract GreetingsTest is Test {
    Greetings greetContract; //create an instance of your contract

    //to init your tests - this will behave like beforeEach in JS
    function setUp() public {
        greetContract = new Greetings("Trying out foundry!");
    }

    // test cases functions will start with the work test
    function test1() public {
        assertEq(greetContract.greet(), "Trying out foundry!");
    }

    // testing a transaction
    function test2() public {
        assertEq(greetContract.version(), 0);
        greetContract.updateGreeting("Foundry looks cool!");
        string memory value = greetContract.greet();
        // this is how you can log - to make this visible you have to run `forge test -vv`
        emit log(value);
        assertEq(value, "Foundry looks cool!");
        assertEq(greetContract.version(), 1);
    }

    // fuzzing test - this will perform fuzzing
    function test3(string memory _greeting) public {
        assertEq(greetContract.version(), 0);
        greetContract.updateGreeting(_greeting);
        assertEq(greetContract.greet(), _greeting);
        assertEq(greetContract.version(), 1);
    }
}
