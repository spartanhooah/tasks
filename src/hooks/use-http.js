import { useState } from "react";

export default function useHttp(requestConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      return await response.json();
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
}
