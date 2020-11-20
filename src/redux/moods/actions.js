import moodsActions from "./constants";
import store from "@redux";

export function addMood(item) {
  const currentStore = store.getState();
  const { moods } = currentStore.moods;

  if (moods.length > 0) {
    item.id = Math.max.apply(Math, moods.map((mood) => { return mood.id; }))
    item.id++;
  }

  const newMoods = [
    ...moods,
    item
  ];

  return async function (dispatch) {
    dispatch(setMoods(newMoods));
  }
}

export function removeMood(id) {
  const currentStore = store.getState();
  const { moods } = currentStore.moods;

  let copyMoods = moods.filter(x => {
    return x.id !== id
  });

  return async function (dispatch) {
    dispatch(setMoods(copyMoods));
  }
}

export function setMoods(moods) {
  // On passe les infos au reducer, via le dispatcher.
  return async function (dispatch) {
    dispatch({
      type: moodsActions.SET_MOODS,
      moods: moods,
    })
  };
}
