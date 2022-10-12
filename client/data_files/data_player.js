//! Item IDs

//  Misc Item IDs: 1 - 1000
//  Weapon Item IDs: 1001 - 2000
//* Armor Item IDs: 2001 - 3000         (Extra)
//* Accessories Item IDs: 3001 - 4000   (Extra)
//  Consumables:    4001 - 5000

//  Weapon Info: Damage: Base Damage, weapon_spill means the diceroll variance. Eg: Weapon Damage 5, spill of 2, means the base damage is 5-2 to 5+2 (3 - 7)
//  Critical Chance: Base of 5%. Increased by skills / items. (Math.ceil(Math.random()* 100)
//  Critical hits do 150% damage (maybe increase in future via effects) - Round down to integer

//* Potential Speed set - Progress bar for who moves (Boot icon?!) - Maybe multiple turns

// name: { type: String, required: true },
// id: { type: Number, required: true },
// level: { type: Number, default: 0 },
// exp: { type: Number, default: 0 },
// exp_req: { type: Number, required: true },
// health: { type: Number, required: true },
// health_max: { type: Number, required: true },
// mana: { type: Number, required: true },
// mana_max: { type: Number, required: true },
// crit_chance: { type: Number, required: true },
// armor: { type: Number, required: true },
// strength: { type: Number, required: true },
// agility: { type: Number, required: true },
// intelligence: { type: Number, required: true },
// equipment: [Items]
// skills: [Skills]
//* status: [],  //  Future addition, for buffs / debuffs
// img_src: { type: String, required: true }, //  Reference which sheet to be used
// img_size: { type: [String], required: true }, //  Div Size
// sprite_pos: { type: [String], required: true }, //  Spritesheet position
// scale: { type: [Number], default: [1, 1] }, //  Image size
// img_translate: { type: [String], default: ["0%", "0%"] }, //  Img adjustment

const player = {
  name: "Dissidia",
  id: "",
  level: 0,
  exp: 0,
  exp_req: 100,
  health: 100,
  health_max: 100,
  mana: 20,
  mana_max: 20,
  crit_chance: 5,
  armor: 0,
  strength: 5,
  agility: 5,
  intelligence: 5,
  equipment: [
    {
      name: "Rusty Sword",
      id: 1001,
      drop_level: 2,
      rarity: "Common",
      damage: 4,
      damage_spill: 2,
      str: 0,
      agi: 0,
      int: 0,
      hp: 0,
      mp: 0,
      scaling_str: 0.2,
      scaling_agi: 0,
      scaling_int: 0,
      type: "Melee",
      img_src: "image_data/icons/weapons/sword/sword_1.png",
      sprite_pos: [],
      gold_value: 50,
    },
  ],
  skills: [
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
  ],
  status: [],
  img_src: "character_sheet_1",
  model_size: ["10%", "35%"],
  sprite_pos: ["25%", "0%"], // Spritesheet Position
  img_scale: [2, 2], // Image size
  img_translate: ["0%", "0%"], //  Img adjustment
};

export default player;
