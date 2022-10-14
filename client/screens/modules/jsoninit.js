import base_data from "../../data_files/base_data.json";

import items from "../../data_files/data_items";
import players from "../../data_files/data_players";
import monsters from "../../data_files/data_monster";
import skills_list from "../../data_files/data_skills";
import zones from "../../data_files/data_zone";

const jsoninit = () => {
  console.log("Resetting base data");

  items.splice(0, items.length);
  monsters.splice(0, monsters.length);
  players.splice(0, players.length);
  skills_list.splice(0, skills_list.length);
  zones.splice(0, zones.length);

  base_data.items.forEach((e) => items.push(structuredClone(e)));
  base_data.monsters.forEach((e) => monsters.push(structuredClone(e)));
  base_data.players.forEach((e) => players.push(structuredClone(e)));
  base_data.skills_list.forEach((e) => skills_list.push(structuredClone(e)));
  base_data.zones.forEach((e) => zones.push(structuredClone(e)));
};

export default jsoninit;
