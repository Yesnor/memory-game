import React, { useEffect, useState } from "react";
import Card from "./Card";
import { connect } from "react-redux";
import { shuffleCards, rememberMatch1, rememberMatch2 } from "./actions";

function Gameboard({
  cards,
  shuffledCards,
  shuffleCards,
  match1,
  match2,
  rememberMatch2,
  rememberMatch1,
}) {
  const [counter, setCounter] = useState(0);
  const shuffle = () => {
    let _images = cards;
    for (let i = _images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = _images[i];
      _images[i] = _images[j];
      _images[j] = temp;
    }

    return _images;
  };
  useEffect(() => {
    shuffleCards(shuffle());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (match1.id) {
      document.getElementById(match1.uniqueId).style.transform =
        "rotateY(0deg)";
    }
    if (match2.id) {
      if (match2.id !== match1.id) {
        document.getElementById(match2.uniqueId).style.transform =
          "rotateY(0deg)";
        setTimeout(() => {
          document.getElementById(match1.uniqueId).style.transform =
            "rotateY(180deg)";
          document.getElementById(match2.uniqueId).style.transform =
            "rotateY(180deg)";
          rememberMatch2(false, false);
          rememberMatch1(false, false);
        }, 1000);
      }
      if (match2.id === match1.id) {
        let matchedCards = shuffledCards.filter((el) => el.id === match1.id);
        document.getElementById(match2.uniqueId).style.transform =
          "rotateY(0deg)";
        setTimeout(() => {
          matchedCards.map((el) => (el.matched = true));
          rememberMatch2(false, false);
          rememberMatch1(false, false);
        }, 1000);
        setCounter(counter + 1);
      }
      rememberMatch2(false, false);
      rememberMatch1(false, false);
    }
    //eslint-disable-next-line
  }, [match1, match2, counter]);
  return (
    <React.Fragment>
      <h1>
        Memory pair game.{" "}
        {counter === 20 ? <span>You won!</span> : <span>Score: {counter}</span>}
      </h1>
      <div className="container board d-flex flex-wrap">
        {shuffledCards.map((card, index) => (
          <Card key={index} card={card} index={index} />
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  cards: state.cards,
  shuffledCards: state.shuffledCards,
  match1: state.match1,
  match2: state.match2,
});
const mapDispatchToProps = {
  shuffleCards,
  rememberMatch1,
  rememberMatch2,
};
export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
