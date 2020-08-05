export const MATCH1 = "MATCH1";
export const MATCH2 = "MATCH2";
export const FETCH = "FETCH";
export const SHUFFLE = "SHUFFLE";

export const rememberMatch1 = (id, uniqueId) => {
  return {
    type: MATCH1,
    id,
    uniqueId,
  };
};

export const rememberMatch2 = (id, uniqueId) => {
  return {
    type: MATCH2,
    id,
    uniqueId,
  };
};

export const fetchCards = (cards) => {
  return {
    type: FETCH,
    cards,
  };
};

export const shuffleCards = (cards) => {
  return {
    type: SHUFFLE,
    cards,
  };
};
