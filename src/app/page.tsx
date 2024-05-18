"use client";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MyComponent />
    </main>
  );
}


function MyComponent() {
    const fetchGreeting = async () => {
      const response = await axios.get("http://ec2-16-171-1-163.eu-north-1.compute.amazonaws.com:8000/greet/morning/Esi");
      console.log("response:: ", response.data)
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
    <div>
      {data}
    </div>
  );
}
