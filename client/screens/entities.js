//!  Control which entities are currently in battle
//* Player will be known as p1, monsters known as m1 m2 m3...
//* Contain zone properties too

//? Push entities in here.

const current_entities = {
  username: "",
  players: [],
  gold: 0,
  items: [2001], //  Should give the healthpot via a different method
  monsters: [],
  zone: {},
  currentplayer: 0,
  currentmonster: 0,
  current_turn: "player",
  fight_status: "",
  skillbar_status: false,
  account_window: false,
};

export default current_entities;
