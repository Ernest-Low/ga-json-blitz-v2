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

const players = []

export default players;
