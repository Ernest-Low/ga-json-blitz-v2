import items from "../../data_files/data_items";
import player from "../../data_files/data_player";
import monsters from "../../data_files/data_monster";
import skills_list from "../../data_files/data_skills";
import zones from "../../data_files/data_zone";

const modchanges = {

  modpack_active: false,

  current_modpack: {
    items: [],
    monsters: [],
    player: [],
    skills_list: [],
    zones: [],
  },

  updatelist: function () {
    this.current_modpack.items.forEach((e) => items.push(structuredClone(e)));
    this.current_modpack.monsters.forEach((e) =>
      monsters.push(structuredClone(e))
    );
    this.current_modpack.player.forEach((e) => player.push(structuredClone(e)));
    this.current_modpack.skills_list.forEach((e) =>
      skills_list.push(structuredClone(e))
    );
    this.current_modpack.zones.forEach((e) => zones.push(structuredClone(e)));
  },
};

export default modchanges;
