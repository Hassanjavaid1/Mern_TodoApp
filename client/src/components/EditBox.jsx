import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverContent } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

export function EditBox(props) {
  const [inputToUpdate, setinputToUpdate] = useState("");

  const handleUpdate = async (id) => {
    try {
      const req = await fetch("http://localhost:3000/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputToUpdate }),
      });
      const res = await req.json();
      console.log(res);
      //call inital function
      props.fetchData();
      //Clear Input Value
      setinputToUpdate("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Edit Task</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={"1" + props.id}>Current title</Label>
              <Input
                id={"1" + props.id}
                defaultValue={props.title}
                className="col-span-2 h-8"
                readOnly
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="new-content">New title</Label>
              <Input
                value={inputToUpdate}
                onChange={(e) => setinputToUpdate(e.target.value)}
                id="new-content"
                className={`col-span-2 h-8`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PopoverClose className="flex flex-1">
              <Button
                variant="destructive"
                className="flex-1 cursor-pointer hover:bg-red-400"
              >
                Close
              </Button>
            </PopoverClose>
            <PopoverClose className="flex flex-1">
              <Button
                onClick={() => handleUpdate(props.id)}
                className="flex-1 bg-blue-500 cursor-pointer hover:bg-blue-400"
              >
                Save
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </>
  );
}
