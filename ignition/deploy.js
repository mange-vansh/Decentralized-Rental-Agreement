const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const RentalAgreement = await hre.ethers.getContractFactory(
    "DecentralizedRentalAgreement"
  );

  const tenant = "0x000000000000000000000000000000000000dEaD"; // replace with actual tenant address
  const rentAmount = hre.ethers.parseEther("1.0");
  const deposit = hre.ethers.parseEther("2.0");
  const dueDate = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  const duration = 30 * 24 * 60 * 60;

  const contract = await RentalAgreement.deploy(
    tenant,
    rentAmount,
    deposit,
    dueDate,
    duration
  );
  await contract.waitForDeployment();

  console.log("RentalAgreement deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
