"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContextType, ThemeContext } from "./ThemeContext";
export default function Home() {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");

  function handleThemeChange(){
     setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <MyComponent />
        <button onClick={handleThemeChange} className={`${theme ==='light' ? 'bg-white text-black border' : 'bg-black text-white'} p-4`}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </ThemeContext.Provider>
    </main>
  );
}

function MyComponent() {
  const { theme } = useContext(ThemeContext) || {};
  const fetchGreeting = async () => {
    const response = await axios.get(
      "http://localhost:8000/"
    );
    console.log("response:: ", response.data);
    return response.data;
  };


  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["greeting"],
    queryFn: fetchGreeting,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`${theme === "light" ? "bg-white" : "bg-black"} `}>
      <div className={`${theme === "light" ? "text-black" : "text-white"} p-4`}>
        <div>{data}</div>
        <div>Data fetched from the rust api hosted on ec2</div>
      </div>
    </div>
  );
}
