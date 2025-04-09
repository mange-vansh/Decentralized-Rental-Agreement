import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoleSwitcher from "./components/RoleSwitcher";

export default function RentalAgreement() {
  const [role, setRole] = useState("tenant");
  const [rentAmount, setRentAmount] = useState("");
  const [deposit, setDeposit] = useState("");
  const [message, setMessage] = useState("");

  const handlePayDeposit = () => {
    setMessage("Security deposit paid (mock call to contract)");
  };

  const handlePayRent = () => {
    setMessage("Rent paid to landlord (mock call to contract)");
  };

  const handleTerminate = () => {
    setMessage(
      "Contract terminated and deposit refunded (mock call to contract)"
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Decentralized Rental Agreement</h1>

      <RoleSwitcher role={role} setRole={setRole} />

      {role === "tenant" && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <Input
              type="number"
              placeholder="Rent Amount in ETH"
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Security Deposit in ETH"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
            <Button onClick={handlePayDeposit}>Pay Security Deposit</Button>
            <Button onClick={handlePayRent}>Pay Rent</Button>
          </CardContent>
        </Card>
      )}

      {role === "landlord" && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <Button onClick={handleTerminate}>Terminate Contract</Button>
          </CardContent>
        </Card>
      )}

      {message && <div className="text-green-600 font-medium">{message}</div>}
    </div>
  );
}
