//? Should all cost mana? Maybe not.
//* Usual skill types currently: Do damage, buff stats (temp / for remainder of fight), recover hp, do critical damage on next skill / attack.
//* Multiplier [str/agi/int]
//* Type: Spells / Skills
//* Weapon: melee, ranged, magic
//* Spells can have a health_cost too!

const skills_list = [
  {
    name: "Power Slash",
    id: 1,
    health_cost: 0,
    mana_cost: 6,
    cooldown: 0,
    damage: 9,
    scaling: [0.5, 0, 0],
    damage_spill: 2,
    type: "skill",
    weapon: "Melee",
    buff: [],
    debuff: [],
    cost: 50,
  },
  {
    name: "Fireball",
    id: 2,
    health_cost: 0,
    mana_cost: 6,
    cooldown: 0,
    damage: 8,
    scaling: [0, 0, 0.75],
    damage_spill: 1,
    type: "spell",
    weapon: "Magic",
    buff: [],
    debuff: [],
    cost: 50,
  },
  {
    name: "Power Shot",
    id: 3,
    health_cost: 0,
    mana_cost: 6,
    cooldown: 0,
    damage: 8,
    scaling: [0, 0, 0.65],
    damage_spill: 3,
    type: "skill",
    weapon: "Ranged",
    buff: [],
    debuff: [],
    cost: 50,
  },
];

export default skills_list;
