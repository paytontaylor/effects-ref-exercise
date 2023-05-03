import { useEffect, useState, useRef } from "react";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const deckId = useRef("");
  const intervalId = useRef("");

  useEffect(() => {
    const fetchDeck = async () => {
      const resp = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      const json = await resp.json()
      deckId.current = json.deck_id
    }
    fetchDeck();
  }, [])

  const handleClick = () => {
    setIsDrawing(!isDrawing)
    intervalId.current = setInterval(fetchCard, 1000)
  }

  async function fetchCard() {
    const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
    const newCard = await resp.json()
    setCards([
      ...cards,
      newCard
    ]);
  }

  const content = cards.length === 52 ? <p>Error: No cards remaining!</p> : (
    <>
    <button onClick={handleClick}>GIMME A CARD</button>
      <div>
      { cards.length > 0 && <img src={cards[cards.length - 1].cards[0].image} alt={cards[cards.length - 1].cards[0].value} />}
      </div>
    </>
  )

  return (
    <div>
      {content}
    </div>
  )
}

export default Game;