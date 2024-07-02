import { sayHello } from "@/api/test";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    sayHello().then(r => {
      console.log(r);
    })
  }, [])
  return (
    <>
      <div bg-gray text="red underline">
        Home
      </div>
    </>
  );
};
