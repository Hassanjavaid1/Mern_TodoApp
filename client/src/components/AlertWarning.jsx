import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AlertWarning() {
  return (
    <>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Input field is empty...</AlertTitle>
      </Alert>
    </>
  );
}

export default AlertWarning;
