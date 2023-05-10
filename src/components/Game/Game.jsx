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
    setIsDrawing(!isDrawing);
    if (!isDrawing) {
    intervalId.current = setInterval(async () => {await fetchCard(cards, setCards)}, 1000);
    } else {
    clearInterval(intervalId.current);
    }
  }

  const fetchCard = async (cards, setCards) => {
    try {
      const resp = await fetch(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
      const newCard = await resp.json()
      console.log("Before:")
      console.log(cards.length)
      setCards([
        ...cards,
        newCard
      ])
      console.log("After:")
      console.log(cards.length)
    } catch (err) {
      throw new Error(err)
    }
  }

  const content = cards.length === 52 ? <p>Error: No cards remaining!</p> : (
    <>
    <button onClick={handleClick}>{isDrawing ? "Stop Drawing" : "Start Drawing"}</button>
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