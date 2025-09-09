import React, { useEffect, useState } from "react";
import AlertWarning from "./AlertWarning";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@radix-ui/react-popover";
import { EditBox } from "./EditBox";

function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }

    try {
      const req = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: inputValue }),
      });
      await req.json();
      //Clean Input
      setInputValue("");
      //Call Function.
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchData = async () => {
    try {
      const req = await fetch("http://localhost:3000");
      const res = await req.json();
      //console.log(res);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Handle Delete Request

  let handleDelete = async (_id) => {
    try {
      const req = await fetch(`http://localhost:3000/${_id}`, {
        method: "DELETE",
      });
      const res = await req.json();
      console.log(res);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-1/2 h-[95vh] flex items-center justify-center m-auto">
      <div className="w-full">
        {warning && <AlertWarning />}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full items-center gap-2 my-3 mb-7"
        >
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add text..."
            className="p-5"
          />
          <Button
            type="submit"
            variant="outline"
            className={"p-5 hover:bg-blue-500 hover:text-white cursor-pointer"}
          >
            Add
          </Button>
        </form>
        <ScrollArea className="h-[50vh]">
          {data.length === 0 || data == [] ? (
            <h1 className="text-center text-2xl line-through text-gray-500">
              No active task found.
            </h1>
          ) : (
            data.map(({ title, _id }) => (
              <div key={_id} className="flex flex-col mx-3">
                <div className="flex items-center justify-between gap-2 my-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={_id}
                      className="w-[1.2rem] h-[1.2rem] data-[state=checked]:bg-blue-500 data-[state=checked]:border-0 peer"
                    />
                    <Label
                      htmlFor={_id}
                      className="font-normal text-[1rem] peer-data-[state=checked]:line-through"
                    >
                      {title}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger>
                        <Button className="bg-blue-500 cursor-pointer hover:bg-blue-400">
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <EditBox id={_id} title={title} fetchData={fetchData} />
                    </Popover>
                    <Button
                      variant="destructive"
                      className=" cursor-pointer hover:bg-red-400"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>
    </section>
  );
}

export default Todo;
