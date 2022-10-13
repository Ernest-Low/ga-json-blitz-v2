// ! Design item drop table?
// * Attributes = [str,agi,int,health,mana] --! Change to an object for more visibility
// * Scaling (Change to object as well for better visibility)
// * Type: melee, ranged, magic
// Melee higher base damage
// Ranged higher damage spill, higher scaling
// Magic no damage (for now?), adds more int / mana

// ! Currently 2 item types only: common / uncommon
// * Loot Table? (Temana loot table probs)
// > Common loot table of monster level -2 to monster level of itemlevel (monster level 4 will drop level 2 - 4 loot)
// > Rare loot table of monster level -4 to monster level of itemlevel (monster level 7 will drop level 3 - 7 loot)
//     - 3% (For now) per fight for rare items
//     - 10% (For now) per monster for common items?

// name: { type: String, required: true },
// id: { type: Number, required: true },
// drop_level: { type: Number, required: true },
// rarity: { type: String, required: true },
// damage: { type: Number, required: true },
// damage_spill: { type: Number, required: true },
// potency: { type: Number, default: 0 }, // For potions and other effects
// strength: { type: Number, default: 0 },
// agility: { type: Number, default: 0 },
// intelligence: { type: Number, default: 0 },
// health: { type: Number, default: 0 },
// mana: { type: Number, default: 0 },
// scaling_str: { type: Number, default: 0 },
// scaling_agi: { type: Number, default: 0 },
// scaling_int: { type: Number, default: 0 },
// type: { type: String, required: true },
// img_src: { type: String, required: true }, //  Link to spritesheet
// sprite_pos: { type: [Number], required: true }, // Spritesheet Position
// gold_value: { type: Number, required: true },

const items = [];

export default items;
