from src.models import Quote

def test_get_quote(client, db):
    quote = Quote(text="some quote", author="some author")
    db.add(quote)
    db.commit()
    db.refresh(quote)

    resp = client.get(f"/quotes/{quote.id}")

    assert resp.status_code == 200
    assert resp.json()["text"] == "some quote"
    assert resp.json()["author"] == "some author"