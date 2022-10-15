import items from "../../data_files/data_items";
import players from "../../data_files/data_players";
import monsters from "../../data_files/data_monster";
import skills_list from "../../data_files/data_skills";
import zones from "../../data_files/data_zone";

const modchanges = {

  modpack_active: false,

  current_modpack: {
    name: "None",
    items: [],
    monsters: [],
    players: [],
    skills_list: [],
    zones: [],
  },

  updatelist: function () {
    this.current_modpack.items.forEach((e) => items.push(structuredClone(e)));
    this.current_modpack.monsters.forEach((e) =>
      monsters.push(structuredClone(e))
    );
    this.current_modpack.players.forEach((e) => players.push(structuredClone(e)));
    this.current_modpack.skills_list.forEach((e) =>
      skills_list.push(structuredClone(e))
    );
    this.current_modpack.zones.forEach((e) => zones.push(structuredClone(e)));
  },
};

export default modchanges;
