from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import  Session
from src.db import engine, get_db
from src.models import Base, QuoteCreate
from src.crud import create_quote, get_quote, get_quote_random

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.post("/quotes")
def create_quote_endpoint(quote: QuoteCreate, db: Session = Depends(get_db)):
    return create_quote(db, quote.text, quote.author)

@app.get("/quotes/random")
def get_quote_random_endpoint(db: Session = Depends(get_db)):
    return get_quote_random(db)

@app.get("/quotes/{quote_id}")
def get_quote_endpoint(quote_id: int, db: Session = Depends(get_db)):
    quote = get_quote(db, quote_id)
    if quote is None:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote