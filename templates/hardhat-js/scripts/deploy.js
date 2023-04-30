const hre = require("hardhat");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const contract = await MyToken.deploy();
  await contract.deployTransaction.wait(4); //wait for 4 confimations

  console.log(`MyToken deployed to: ${contract.address}`);

  // verify contract
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
