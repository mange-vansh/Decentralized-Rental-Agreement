import { Button } from "@/components/ui/button";

export default function RoleSwitcher({ role, setRole }) {
  return (
    <div className="flex gap-4">
      <Button
        variant={role === "landlord" ? "default" : "outline"}
        onClick={() => setRole("landlord")}
      >
        Landlord
      </Button>
      <Button
        variant={role === "tenant" ? "default" : "outline"}
        onClick={() => setRole("tenant")}
      >
        Tenant
      </Button>
    </div>
  );
}
