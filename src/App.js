import React, { useEffect, useState } from "react";
import "./App.css";
import Gameboard from "./Gameboard";
import Spinner from "./Spinner";
import Axios from "axios";
import { v4 } from "uuid";
import { fetchCards } from "./actions";
import { connect } from "react-redux";

function App({ cards, fetchCards, match1, match2 }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://picsum.photos/200";
  const pairsCount = 8;

  const fetchImages = async () => {
    let images = [];
    while (images.length < pairsCount) {
      const res = await Axios.get(url);
      if (res.request.responseURL) {
        images.push(res.request.responseURL);
      }
    }
    setImages(images);
  };

  const generateMemoryCards = () => {
    if (images.length === pairsCount) {
      const pairedImages = [];

      images.forEach((image) => {
        let id = v4();
        pairedImages.push({
          url: image,
          id: id,
          opened: false,
          matched: false,
          uniqueId: v4(),
        });
        pairedImages.push({
          url: image,
          id: id,
          opened: false,
          matched: false,
          uniqueId: v4(),
        });
      });
      setLoading(false);
      // setPairs(pairedImages);
      fetchCards(pairedImages);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    generateMemoryCards();
    //eslint-disable-next-line
  }, [images]);

  return (
    <div className="App container">
      {loading && <Spinner />}
      {!loading && <Gameboard />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    match1: state.match1,
    match2: state.match2,
  };
};

const mapDispatchToProps = {
  fetchCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
