// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DecentralizedRentalAgreement {
    enum State { Created, Active, Terminated }

    address payable public landlord;
    address payable public tenant;
    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public rentDueDate;
    uint256 public duration;
    State public contractState;

    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only landlord allowed");
        _;
    }

    modifier onlyTenant() {
        require(msg.sender == tenant, "Only tenant allowed");
        _;
    }

    modifier inState(State expected) {
        require(contractState == expected, "Invalid state");
        _;
    }

    constructor(address payable _tenant, uint256 _rentAmount, uint256 _securityDeposit, uint256 _rentDueDate, uint256 _duration) {
        landlord = payable(msg.sender);
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        rentDueDate = _rentDueDate;
        duration = _duration;
        contractState = State.Created;
    }

    function paySecurityDeposit() external payable onlyTenant inState(State.Created) {
        require(msg.value == securityDeposit, "Incorrect deposit");
        contractState = State.Active;
    }

    function payRent() external payable onlyTenant inState(State.Active) {
        require(msg.value == rentAmount, "Incorrect rent");
        require(block.timestamp <= rentDueDate + 7 days, "Rent payment overdue");
        landlord.transfer(msg.value);
    }

    function terminateContract() external onlyLandlord inState(State.Active) {
        contractState = State.Terminated;
        tenant.transfer(securityDeposit);
    }

    function evictTenant() external onlyLandlord inState(State.Active) {
        contractState = State.Terminated;
    }

    function refundDeposit() external onlyLandlord inState(State.Terminated) {
        landlord.transfer(address(this).balance);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
