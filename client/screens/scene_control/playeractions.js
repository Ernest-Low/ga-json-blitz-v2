// import items from "../../data_files/data_items.js";
import update_hpmp from "../modules/update_hpmp.js";
import $actionText from "../modules/actionText.js";
import current_entities from "../entities.js";
import turn_control from "./turn_control.js";

//  Weapon Info: Damage: Base Damage, weapon_spill means the diceroll variance. Eg: Weapon Damage 5, spill of 2, means the base damage is 5-2 to 5+2 (3 - 7)
//  Critical Chance: Base of 5%. Increased by skills / items. (Math.ceil(Math.random()* 100)
//  Critical hits do 150% damage (maybe increase in future via effects) - Round down to integer
const player_actions = {
  reset_critical: function () {
    this.critical_hit = "";
  },

  critical_hit: "",

  //  Calculate damage
  attack_calculation: function (entity, multiplier) {
    let damage_spill_chance = Math.random();
    if (damage_spill_chance > 0.5) {
      damage_spill_chance = 1;
    } else damage_spill_chance = -1;

    let final_str = entity.strength;
    let final_agi = entity.strength;
    let final_int = entity.strength;
    entity.equipment.forEach((element) => {
      final_str += element.strength;
      final_agi += element.agility;
      final_int += element.intelligence;
    });

    let total_damage =
      multiplier.damage +
      multiplier.scaling_str * final_str +
      multiplier.scaling_agi * final_agi +
      multiplier.scaling_int * final_int +
      damage_spill_chance *
        Math.floor(Math.random() * (multiplier.damage_spill + 1));

    return total_damage;
  },

  damage_adjustment: function (damage) {
    let weapon_round = Math.random();
    if (weapon_round > 0.5) {
      damage = Math.ceil(damage);
    } else {
      damage = Math.floor(damage);
    }
    return damage;
  },

  critical_check: function (entity, damage) {
    //  Increase in future via items / buffs
    let crit_chance = entity.crit_chance;
    if (crit_chance > Math.ceil(Math.random() * 100)) {
      damage = Math.floor(damage * 1.5);
      this.critical_hit = "CRITICAL! ";
      // console.log("CRITICAL!");
    }
    return damage;
  },

  damage_target: function (damage, target, type) {
    current_entities.current_turn = "inbetween";
    //  Seconds till enemy turn
    turn_control.player_turn(2.5);

    if (target.health >= damage) {
      update_hpmp(target, damage, 0);
      $actionText(
        `${this.critical_hit}You dealt ${damage} damage to ${target.name} with ${type}!`,
        0.8
      );
    } else {
      update_hpmp(target, target.health, 0);
      $actionText(
        `${this.critical_hit}You overkilled ${target.name}, dealing ${damage} damage with ${type}!`,
        0.8
      );
    }
  },

  // //! Temporarily here to calculate full stats from equipment for attacks
  // equipment_stats: function (entity) {
  //   const new_entity = structuredClone(entity);
  //   new_entity.equipment.forEach((element) => {
  //     new_entity.strength = new_entity.strength + element.strength;
  //     new_entity.agility = new_entity.agility + element.agility;
  //     new_entity.intelligence = new_entity.intelligence + element.intelligence;
  //   });
  //   return new_entity;
  // },

  //    Basic attack by player
  player_attack: function (entity, target) {
    this.reset_critical();
    const weapon = entity.equipment.find(
      (element) =>
        element.type == "Melee" ||
        element.type == "Ranged" ||
        element.type == "Magic"
    );
    const damage = this.attack_calculation(entity, weapon);
    const damage_total = this.damage_adjustment(
      this.critical_check(entity, damage)
    );
    //  Target buffs for defense go here in calculations
    const final_damage = damage_total - target.armor;

    this.damage_target(final_damage, target, "a basic attack");
  },

  player_skill: function (entity, spell, target) {
    // entity = this.equipment_stats(entity);
    this.reset_critical();
    let damage_spill_chance = Math.random();
    damage_spill_chance > 0.5
      ? (damage_spill_chance = 1)
      : (damage_spill_chance = -1);

    let final_str = entity.strength;
    let final_agi = entity.strength;
    let final_int = entity.strength;
    entity.equipment.forEach((element) => {
      final_str += element.strength;
      final_agi += element.agility;
      final_int += element.intelligence;
    });

    let spell_damage =
      spell.damage +
      spell.scaling_str * final_str +
      spell.scaling_agi * final_agi +
      spell.scaling_int * final_int +
      damage_spill_chance *
        Math.floor(Math.random() * (spell.damage_spill + 1));
    console.log(`First spell damage calculation: ${spell_damage}`);
    const damage_total = this.damage_adjustment(
      this.critical_check(entity, spell_damage)
    );
    //  Target buffs for defense go here in calculations
    const final_damage = damage_total - target.armor;
    this.damage_target(final_damage, target, spell.name);
    update_hpmp(entity, spell.health_cost, spell.mana_cost);
  },
};

export default player_actions;
