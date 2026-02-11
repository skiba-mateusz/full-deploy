import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.db import Base, get_db
from src.main import app
from fastapi.testclient import TestClient
import os

TEST_DB_URL = os.getenv("TEST_DB_URL", "postgresql://postgres:admin@localhost:5432/example_test")
engine = create_engine(TEST_DB_URL)
TestSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

@pytest.fixture
def db():
    session = TestSession()
    try:
        yield session
    finally:
        session.rollback()
        session.close()

@pytest.fixture
def client(db):
    app.dependency_overrides[get_db] = lambda: db
    return TestClient(app)