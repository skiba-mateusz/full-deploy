import { Button } from "@/components/ui/button";
import { useGetRandomQuote } from "../api/get-random-quote";
import { CreateQuoteDialog } from "../components/create-quote-dialog";
import { useEffect, useState } from "react";
import { useCreateQuote } from "../api/create-quote";
import type { Quote } from "@/types/api";
import { Loader } from "lucide-react";

export const QuoteView = () => {
  const {
    data: quote,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetRandomQuote();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const {
    data: newQuote,
    createQuote,
    isLoading: isCreatingQuote,
  } = useCreateQuote();
  const [displayedQuote, setDisplayedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    setDisplayedQuote(quote);
  }, [quote]);

  useEffect(() => {
    setDisplayedQuote(newQuote);
  }, [newQuote]);

  if (isError) {
    console.error(error);
    return null;
  }

  if (!displayedQuote) {
    return null;
  }

  return (
    <>
      <section className="flex flex-col items-center">
        <header className="flex items-center">
          <h1>Random Quote Generator</h1>
          <Button
            variant="outlined"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Add Quote
          </Button>
        </header>
        {isLoading ? (
          <Loader />
        ) : (
          <em className="text-center">
            "{displayedQuote.text}" - {displayedQuote.author}
          </em>
        )}
        <Button onClick={refetch}>Get Quote!</Button>
      </section>
      <CreateQuoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={createQuote}
        isCreatingQuote={isCreatingQuote}
      />
    </>
  );
};
