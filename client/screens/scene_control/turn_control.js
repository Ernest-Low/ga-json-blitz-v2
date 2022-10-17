//! Control turn of battle (timer)
//? Speed stat to affect in future? Will need to calculate whos turn is it next
//* Set timeouts when called to next action / unlock buttons when it's player's turn
//  Also good place to trigger buffs / debuff effects
import $ from "jquery";
import current_entities from "../entities";
import enemyAttack from "./enemyattack";
import $actionText from "../modules/actionText.js";
import afterBattle from "../modules/afterbattle.js";

const turn_control = {
  //  Remove equipment stats
  calculate_equipment: function () {
    current_entities.players.forEach((character) => {
      character.equipment.forEach((element) => {
        character.health_max -= element.health;
        character.mana_max -= element.mana;
        character.strength -= element.strength;
        character.agility -= element.agility;
        character.intelligence -= element.intelligence;
      });
      if (character.health > character.health_max) {
        character.health = character.health_max;
      }
      if (character.mana > character.mana_max) {
        character.mana = character.mana_max;
      }
    });
  },

  //  Linked to checking all dead enemies, checks if there are no remaining entities
  battle_over: function () {
    //  Defeat (all players dead)
    if (
      current_entities.players.every((obj) => {
        if (obj.health == 0) {
          return true;
        }
        return false;
      })
    ) {
      console.log("DEFEAT!");
      current_entities.current_turn = "ended";
      current_entities.fight_status = "DEFEAT!";
      afterBattle.defeat();
      $("#battlescreen").fadeOut(1000);
      setTimeout(() => {
        $("#battlescreen").remove();
      }, 1050);
    }

    //  Victory (all monsters dead)
    if (
      current_entities.monsters.every((obj) => {
        if (obj.health == 0) {
          return true;
        }
        return false;
      })
    ) {
      console.log("VICTORY!");
      current_entities.current_turn = "ended";
      current_entities.fight_status = "VICTORY!";
      this.calculate_equipment();
      afterBattle.zone_clear_check();
      $("#battlescreen").fadeOut(1000);
      setTimeout(() => {
        $("#battlescreen").remove();
      }, 1050);
    }
  },

  //  Call this before giving the next turn to check dead enemies (and giving time to animate)
  //  Try not to delete enemies, might push into another array of defeated entities, gives opportunity for revival inbattle
  dead_entity_check: function () {
    current_entities.players.forEach((obj) => {
      if (obj.health <= 0) {
        // Deleting the player on screen... temporary
        $(`${obj.id}box`).remove();
      }
    });
    current_entities.monsters.forEach((obj) => {
      if (obj.health <= 0) {
        $(`${obj.id}box`).remove();
      }
    });
    this.battle_over();
  },

  //  Player turn over, pending monster turn
  player_turn: function (time) {
    console.log("Player turn over, pending monster turn");
    setTimeout(() => {
      this.dead_entity_check();
      if (current_entities.current_turn !== "ended") {
        current_entities.current_turn = "monster";
        enemyAttack.enemy_attack(
          current_entities.monsters[current_entities.currentmonster],
          current_entities.players[current_entities.currentplayer]
        );
      }
    }, time * 1000);
  },

  //    Monster turn over, pending player turn
  enemy_turn: function (time) {
    console.log("Monster turn over, pending player turn");
    setTimeout(() => {
      this.dead_entity_check();
      if (current_entities.current_turn !== "ended") {
        current_entities.current_turn = "player";
        $actionText("It's your turn now!", 0.3);
      }
    }, time * 1000);
  },
};
export default turn_control;
