import { useState } from "react";

type useGETResponse = {
  result: any;
  error?: string;
  request: () => void;
};

export const useGET = (url: string): useGETResponse => {
  const [result, setResult] = useState();
  const [error, setError] = useState("");
  const request = async () => {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setResult(data);
    } else {
      setError("Unexpected error from the server: " + response.status);
    }
  };

  return {
    result,
    error,
    request,
  };
};
