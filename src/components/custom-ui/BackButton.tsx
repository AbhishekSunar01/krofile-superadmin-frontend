import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function BackButton() {
  return (
    <>
      <Button className="">
        <ArrowLeft className="h-5 w-5" />
      </Button>
    </>
  );
}
