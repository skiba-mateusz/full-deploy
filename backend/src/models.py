from sqlalchemy import Integer, Column, String
from pydantic import BaseModel
from src.db import Base

class QuoteCreate(BaseModel):
    text: str
    author: str

class Quote(Base):
    __tablename__ = "quotes"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    author = Column(String, nullable=True)
