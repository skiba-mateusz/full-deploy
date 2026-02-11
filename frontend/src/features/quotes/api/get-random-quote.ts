import { useCallback, useEffect, useState } from "react";
import type { Quote } from "@/types/api";
import api from "@/lib/api-client";

const getRandomQuoteApi = async (): Promise<Quote> => {
  const { data } = await api.get("/quotes/random");
  return data;
};

export const useGetRandomQuote = () => {
  const [data, setData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomQuote = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const quote = await getRandomQuoteApi();
      setData(quote);
    } catch (err: any) {
      setIsError(true);
      setError(err?.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [getRandomQuote]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: getRandomQuote,
  };
};
