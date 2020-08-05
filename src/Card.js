import React from "react";
import { rememberMatch1, rememberMatch2 } from "./actions";
import { connect } from "react-redux";

function Card({ card, match1, match2, rememberMatch1, rememberMatch2, index }) {
  return (
    <div
      className="card"
      style={
        card.matched ? { visibility: "hidden" } : { visibility: "visible" }
      }
      onClick={(e) => {
        if (!match1.id) {
          rememberMatch1(card.id, card.uniqueId);
        } else {
          if (!match2.id) {
            rememberMatch2(card.id, card.uniqueId);
          }
        }
      }}
    >
      <div
        className="card-flip"
        id={card.uniqueId}
        style={
          card.opened
            ? { transform: "rotateY(0deg)" }
            : { transform: "rotateY(180deg)" }
        }
      >
        <div className="card-flip-front">
          <img src={card.url} alt="" />
        </div>
        <div className="card-flip-back"></div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  match1: state.match1,
  match2: state.match2,
});
const mapDispatchToProps = {
  rememberMatch1,
  rememberMatch2,
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
