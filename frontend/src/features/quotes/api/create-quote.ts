import api from "@/lib/api-client";
import type { Quote } from "@/types/api";
import React, { useState } from "react";

export interface CreateQuotePayload {
  text: string;
  author: string;
}

const createQuoteApi = async (payload: CreateQuotePayload): Promise<Quote> => {
  const { data } = await api.post("/quotes", payload, {
    headers: { ContentType: "application/json" },
  });
  return data;
};

export const useCreateQuote = () => {
  const [data, setData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createQuote = React.useCallback(async (data: CreateQuotePayload) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const quote = await createQuoteApi(data);
      setData(quote);
    } catch (err: any) {
      setIsError(true);
      setError(err?.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, isError, error, createQuote };
};
