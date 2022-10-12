//  ! Monsters

//  ? Player exp calculation - Up to level 10?
//  * Player Level         : 1    2    3    4    5    6     7     8     9     10
//  * Player Levels EXP req: 100  230  390  580  800  1050  1330  1640  1980  2350
//  15n^2 + 85n

//  ? Monster Exp Calculation
//  * Monsters lvl from 1 - 15
//  * Exp per monster: Monster level * 10 * (4 to 6) + (20 to 40)
//  * Monster level:     1          2           3           4           5           6           7           8           9           10
//  * Monster exp:   100 - 118  139 - 172   184 - 232   235 - 298   292 - 370   355 - 448   424 - 532   499 - 622   580 - 718   667 - 820
//  3n^2 + 30n + 67 to  3n^2 + 45n + 70

//  ? Monster Damage Calculation
//  * Damage window = (damage - damage_spill) to (damage + damage_spill)
//  * Critical chance (150% damage) - Base of 3%.
//  * > Critical chance increases by 1% per monster level above the player

//  ? Level scaling
//  * Future addition!? Need to think of a calculation that will determine an enemy's power.

//     name: { type: String, required: true },
//     id: { type: Number, required: true },
//     level: { type: Number, required: true },
//     health: { type: Number, required: true },
//     health_max: { type: Number, required: true },
//     mana: { type: Number, default: 0 },
//     mana_max: { type: Number, default: 0 },
//     armor: { type: Number, default: 0 },
//     damage: { type: Number, required: true },
//     damage_spill: { type: Number, required: true },
//     crit_chance: { type: Number, default: 0 },
//     strength: { type: Number, required: true },
//     agility: { type: Number, required: true },
//     intelligence: { type: Number, required: true },
//     scaling_str: { type: Number, default: 0 },
//     scaling_agi: { type: Number, default: 0 },
//     scaling_int: { type: Number, default: 0 },
//     skills: [Skills]
//*    status: [],    //  Future addition with buffs / debuffs
//     img_src: { type: String, required: true }, //  Reference which sheet to be used
//     model_size: { type: [String], required: true }, //  Div Size
//     sprite_pos: { type: [String], required: true }, //  Spritesheet position
//     scale: { type: [Number], default: [1, 1] }, //  Image size
//     img_translate: { type: [String], default: ["0%", "0%"] }, //  Img adjustment

const monsters = [
  {
    name: "Goblin",
    id: 1,
    level: 1,
    health: 30,
    health_max: 30,
    mana: 0,
    mana_max: 0,
    armor: 0,
    damage: 5,
    damage_spill: 2,
    crit_chance: 0,
    strength: 5,
    agility: 5,
    intelligence: 2,
    scaling_str: 0.3,
    scaling_agi: 0.2,
    scaling_int: 0,
    skills: [],
    // status: [],  // Future addition
    model_size: ["8.5%", "30%"],
    img_src: "monster_sheet_1", //  Reference which sheet to be used
    sprite_pos: ["16.67%", "0%"], //  Spritesheet position
    img_scale: [2.5, 2.5], //  Image size
    img_translate: ["0%", "0%"], //  Img adjustment
  },
  {
    name: "Orc",
    id: 2,
    level: 3,
    health: 45,
    health_max: 45,
    mana: 0,
    mana_max: 0,
    armor: 1,
    damage: 7,
    damage_spill: 3,
    crit_chance: 0,
    strength: 7,
    agility: 4,
    intelligence: 2,
    scaling_str: 0.5,
    scaling_agi: 0.1,
    scaling_int: 0,
    skills: [],
    status: [],
    model_size: ["10%", "40%"],
    img_src: "monster_sheet_1",
    sprite_pos: ["66.67%", "0%"],
    img_scale: [1.6, 1.6],
    img_translate: ["5%", "5%"],
  },
  {
    name: "Twister",
    id: 3,
    level: 2,
    health: 30,
    health_max: 30,
    mana: 0,
    mana_max: 0,
    armor: 0,
    damage: 5,
    damage_spill: 4,
    crit_chance: 30,
    strength: 4,
    agility: 7,
    intelligence: 2,
    scaling_str: 0.2,
    scaling_agi: 0.4,
    scaling_int: 0,
    skills: [],
    status: [],
    model_size: ["7.5%", "40%"],
    img_src: "monster_sheet_1",
    sprite_pos: ["33.33%", "20%"],
    img_scale: [1.5, 1.2],
    img_translate: ["0%", "0%"],
  },
  {
    name: "Orc Shaman",
    id: 4,
    level: 2,
    health: 40,
    health_max: 40,
    mana: 30,
    mana_max: 30,
    armor: 0,
    damage: 4,
    damage_spill: 1,
    crit_chance: 0,
    strength: 3,
    agility: 3,
    intelligence: 8,
    scaling_str: 0,
    scaling_agi: 0,
    scaling_int: 0,
    skills: [2],
    status: [],
    model_size: ["7.5%", "40%"],
    img_src: "monster_sheet_1",
    sprite_pos: ["16.67%", "40%"],
    img_scale: [1.9, 1.6],
    img_translate: ["-20%", "0%"],
  },
  {
    name: "Skeleton Archer",
    id: 5,
    level: 2,
    health: 35,
    health_max: 35,
    mana: 15,
    mana_max: 15,
    armor: 0,
    damage: 5,
    damage_spill: 4,
    crit_chance: 10,
    strength: 3,
    agility: 7,
    intelligence: 2,
    scaling_str: 0.2,
    scaling_agi: 0.4,
    scaling_int: 0,
    skills: [3],
    status: [],
    model_size: ["10%", "35%"],
    img_src: "monster_sheet_1",
    sprite_pos: ["83.33%", "0%"],
    img_scale: [1.7, 1.9],
    img_translate: ["-15%", "5%"],
  },
  {
    name: "Skeletal Hound",
    id: 6,
    level: 3,
    health: 40,
    health_max: 40,
    mana: 0,
    mana_max: 0,
    armor: 1,
    damage: 6,
    damage_spill: 4,
    crit_chance: 10,
    strength: 5,
    agility: 7,
    intelligence: 2,
    scaling_str: 0.3,
    scaling_agi: 0.5,
    scaling_int: 0,
    skills: [],
    status: [],
    model_size: ["10%", "25%"],
    img_src: "monster_sheet_1",
    sprite_pos: ["16.67%", "100%"],
    img_scale: [1.6, 1.6],
    img_translate: ["-5%", "5%"],
  },
  {
    name: "Harpy",
    id: 7,
    level: 3,
    health: 40,
    health_max: 40,
    mana: 0,
    mana_max: 0,
    armor: 1,
    damage: 6,
    damage_spill: 4,
    crit_chance: 10,
    strength: 5,
    agility: 7,
    intelligence: 2,
    scaling_str: 0.3,
    scaling_agi: 0.5,
    scaling_int: 0,
    skills: [],
    status: [],
    model_size: ["10%", "50%"],
    img_src: "monster_sheet_1",
    sprite_pos: ["33.33%", "0%"],
    img_scale: [1.8, 1.5],
    img_translate: ["8%", "5%"],
  },
];

export default monsters;

// "background-image": "url('../image_data/btm_Left_Panel.png')",

// image_data\monsters\skeletonhound.png
