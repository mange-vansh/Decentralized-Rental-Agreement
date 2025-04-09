const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DecentralizedRentalAgreement", function () {
  let landlord, tenant, contract;

  const rentAmount = ethers.parseEther("1.0");
  const deposit = ethers.parseEther("2.0");

  beforeEach(async function () {
    [landlord, tenant, _] = await ethers.getSigners();

    const RentalAgreement = await ethers.getContractFactory(
      "DecentralizedRentalAgreement"
    );
    const dueDate = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const duration = 30 * 24 * 60 * 60;

    contract = await RentalAgreement.deploy(
      tenant.address,
      rentAmount,
      deposit,
      dueDate,
      duration
    );
  });

  it("should accept security deposit from tenant", async function () {
    await contract.connect(tenant).paySecurityDeposit({ value: deposit });
    expect(await contract.contractState()).to.equal(1); // State.Active
  });

  it("should allow tenant to pay rent after deposit", async function () {
    await contract.connect(tenant).paySecurityDeposit({ value: deposit });
    await expect(() =>
      contract.connect(tenant).payRent({ value: rentAmount })
    ).to.changeEtherBalance(landlord, rentAmount);
  });

  it("should allow landlord to terminate contract and refund deposit", async function () {
    await contract.connect(tenant).paySecurityDeposit({ value: deposit });
    await contract.connect(landlord).terminateContract();

    await expect(() =>
      contract.connect(landlord).refundDeposit()
    ).to.changeEtherBalance(landlord, deposit);
  });
});
