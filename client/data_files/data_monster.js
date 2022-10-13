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

const monsters = [];

export default monsters;

// "background-image": "url('../image_data/btm_Left_Panel.png')",

// image_data\monsters\skeletonhound.png
