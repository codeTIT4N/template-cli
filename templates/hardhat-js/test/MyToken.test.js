// const { expect } = require("chai");
const { ethers } = require("hardhat");
const { before, describe, it } = require("mocha");

describe("MyToken tests", () => {

    async function deployContracts() {
        console.log("deploying new contracts...");
        const MyToken = await ethers.getContractFactory("MyToken");
        mytoken = await MyToken.deploy();
        await mytoken.deployed();
        console.log("done...");
    }

    before(async function () {
        const accounts = await ethers.getSigners();
        const [
            owner,
            ankit, bhuvan, chitra, daksh, ekta, fateh, gagan, hari, isha,
            A, B, C, D, E] = accounts;
        await deployContracts();
    })

    it("MyToken Address: ", () => {
        console.log("mytoken address", mytoken.address)
    })
})