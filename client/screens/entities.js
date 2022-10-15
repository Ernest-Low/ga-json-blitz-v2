//!  Control which entities are currently in battle
//* Player will be known as p1, monsters known as m1 m2 m3...
//* Contain zone properties too

//? Push entities in here.

const current_entities = {
  //  Saved Variables
  username: "",
  players: [],
  gold: 0,
  items: [],
  monsters: [],
  zone: {},

  //* Online Savefiles
  savefiles_local: [{ name: "Empty Local Savefile", active: false }],
  savefiles_online: [],

  // Non-Saved variables
  game_active: false,
  currentplayer: 0,
  currentmonster: 0,
  current_turn: "player",
  fight_status: "",
  skillbar_status: false,
  account_window: false,
};

export default current_entities;
