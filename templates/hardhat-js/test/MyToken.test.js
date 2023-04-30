const { expect } = require("chai");
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
    [
      owner,
      ankit,
      bhuvan,
      chitra,
      daksh,
      ekta,
      fateh,
      gagan,
      hari,
      isha,
      A,
      B,
      C,
      D,
      E,
    ] = accounts;
    await deployContracts();
  });

  function toBN(_num) {
    return ethers.BigNumber.from(_num.toString());
  }
  function parseEth(_num) {
    return ethers.utils.parseEther(_num.toString());
  }
  function formatEth(_num) {
    return ethers.utils.formatEther(_num.toString());
  }

  describe("Deployment", () => {
    it("MyToken should deploy correctly", () => {
      expect(mytoken.address).to.not.equal(ethers.constants.AddressZero);
    });

    it("MyToken should have name and symbol set properly", async () => {
      expect(await mytoken.name()).to.equal("MyToken");
      expect(await mytoken.symbol()).to.equal("MTK");
    });
  });

  describe("Transactions", function () {
    it("Owner should be able to mint tokens", async function () {
      await mytoken.connect(owner).mint(owner.address, parseEth(100));
      expect(await mytoken.balanceOf(owner.address)).to.equal(parseEth(100));
    });

    it("Owner should be able to burn tokens", async function () {
      await mytoken.connect(owner).burn(parseEth(10));
      expect(await mytoken.balanceOf(owner.address)).to.equal(parseEth(90));
    });
    it("Should transfer tokens between accounts", async function () {
      try {
        // Transfer 50 tokens from owner to ankit
        await mytoken.connect(owner).transfer(ankit.address, parseEth(50));
        const ankitBalance = await mytoken.balanceOf(ankit.address);
        expect(ankitBalance).to.equal(parseEth(50));
        // Transfer 50 tokens from ankit to bhuvan
        await mytoken.connect(ankit).transfer(bhuvan.address, parseEth(50));
        const bhuvanBalance = await mytoken.balanceOf(bhuvan.address);
        expect(bhuvanBalance).to.equal(parseEth(50));
      } catch (e) {
        console.log(e);
      }
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await mytoken.balanceOf(owner.address);

      // Try to send 1000 token from ankit to owner.
      await expect(
        mytoken.connect(ankit).transfer(owner.address, parseEth(1000))
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await mytoken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
