const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RentalAgreementModule", (m) => {
  const tenant = "0x000000000000000000000000000000000000dEaD";
  const rentAmount = m.getParameter("rentAmount", "1000000000000000000"); // 1 ETH
  const deposit = m.getParameter("deposit", "2000000000000000000"); // 2 ETH
  const dueDate = m.getParameter(
    "dueDate",
    Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
  );
  const duration = m.getParameter("duration", 30 * 24 * 60 * 60);

  const contract = m.contract("DecentralizedRentalAgreement", [
    tenant,
    rentAmount,
    deposit,
    dueDate,
    duration,
  ]);

  return { contract };
});
