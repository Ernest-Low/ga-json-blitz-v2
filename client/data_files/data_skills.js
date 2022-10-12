//? Should all cost mana? Maybe not.
//* Usual skill types currently: Do damage, buff stats (temp / for remainder of fight), recover hp, do critical damage on next skill / attack.
//* Multiplier [str/agi/int]
//* Type: Spells / Skills
//* Weapon: melee, ranged, magic
//* Spells can have a health_cost too!

// name: { type: String, required: true },
// id: { type: Number, required: true },
// health_cost: { type: Number, default: 0 },
// mana_cost: { type: Number, default: 0 },
// cooldown: { type: Number, default: 0 },
// damage: { type: Number, default: 0 },
// scaling_str: { type: Number, default: 0 },
// scaling_agi: { type: Number, default: 0 },
// scaling_int: { type: Number, default: 0 },
// damage_spill: { type: Number, required: true },
// type: { type: String, required: true },
// weapon: { type: String, required: true },
//* buff: [],      //  Future Addition
//* debuff: [],    //  Future Addition
// gold_cost: { type: Number, required: true },
// img_src: { type: String, required: true }, //  Reference which sheet to be used
// sprite_pos: { type: [String], required: true }, //  Spritesheet position

const skills_list = [
  {
    name: "Power Slash",
    id: 1,
    health_cost: 0,
    mana_cost: 6,
    cooldown: 0,
    damage: 9,
    scaling_str: 0.5,
    scaling_agi: 0,
    scaling_int: 0,
    damage_spill: 2,
    type: "skill",
    weapon: "Melee",
    // buff: [],
    // debuff: [],
    gold_cost: 50,
    // img_src: "",     //  For use in skill tool-tip
    // sprite_pos: ""   //  For use in skill tool-tip
  },
  {
    name: "Fireball",
    id: 2,
    health_cost: 0,
    mana_cost: 6,
    cooldown: 0,
    damage: 8,
    scaling_str: 0,
    scaling_agi: 0,
    scaling_int: 0.75,
    damage_spill: 1,
    type: "spell",
    weapon: "Magic",
    // buff: [],
    // debuff: [],
    gold_cost: 50,
    // img_src: "",
    // sprite_pos: ""
  },
  {
    name: "Power Shot",
    id: 3,
    health_cost: 0,
    mana_cost: 6,
    cooldown: 0,
    damage: 8,
    scaling_str: 0,
    scaling_agi: 0.65,
    scaling_int: 0,
    damage_spill: 3,
    type: "skill",
    weapon: "Ranged",
    // buff: [],
    // debuff: [],
    gold_cost: 50,
    // img_src: "",
    // sprite_pos: ""
  },
];

export default skills_list;
