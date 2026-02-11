from sqlalchemy import func
from sqlalchemy.orm import Session
from src.models import Quote

def create_quote(db: Session, text: str, author: str):
    quote = Quote(text=text, author=author)
    db.add(quote)
    db.commit()
    db.refresh(quote)
    return quote

def get_quote(db: Session, id: int):
    return db.query(Quote).filter(Quote.id == id).first()

def get_quote_random(db: Session):
    return db.query(Quote).order_by(func.random()).first()