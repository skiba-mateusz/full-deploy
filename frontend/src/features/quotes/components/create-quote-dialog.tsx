import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog/dialog";
import { type CreateQuotePayload } from "../api/create-quote";

interface CreateQuoteDialogProps {
  isOpen: boolean;
  isCreatingQuote: boolean;
  onClose: () => void;
  onCreate: (payload: CreateQuotePayload) => Promise<void>;
}

export const CreateQuoteDialog = ({
  isOpen,
  onClose,
  onCreate,
  isCreatingQuote,
}: CreateQuoteDialogProps) => {
  const [text, setText] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    console.log(e);
    if (!text || !author) return;
    e.preventDefault();
    await onCreate({ text, author });
    setText("");
    setAuthor("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <h3>Adding Quote</h3>
      </DialogHeader>
      <DialogContent>
        <form onSubmit={handleSubmit} id="create-quote-form">
          <label>
            Text
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </label>
          <label>
            Author
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
        </form>
      </DialogContent>
      <DialogFooter>
        <Button
          form="create-quote-form"
          type="submit"
          variant="outlined"
          isLoading={isCreatingQuote}
        >
          Add
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
