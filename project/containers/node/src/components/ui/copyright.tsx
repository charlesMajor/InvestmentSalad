"use client";

export default function Copyright() {
  return (
    <div className="2xl:fixed bottom-0 w-full flex justify-between flex-row-reverse md:flex-row border bg-zinc-300 bg-opacity-75 px-5">
      <div className="">
        <span className="ml-5 justify-start text-zinc-900 text-xs font-medium ">
          © 2024 All Rights Reserved
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-5 my-2">
        <span className=" text-zinc-900 text-xs font-medium ">Mathys Deshaies</span>
        <span className=" text-zinc-900 text-xs font-medium ">Justin Goulet</span>
        <span className=" text-zinc-900 text-xs font-medium ">Mikee Blanchet</span>
        <span className=" text-zinc-900 text-xs font-medium ">Alexis Chatigny</span>
        <span className=" text-zinc-900 text-xs font-medium ">Charles Major</span>
      </div>
    </div>
  );
}
