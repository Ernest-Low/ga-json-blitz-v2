//! To create a battlescene with provided variables
import battleScreen from "../battlescreen";
import zone_control from "../scene_control/zone_control.js";
import current_fight from "../current_fight";
import current_entities from "../entities";

const create_battle = () => {
  const calculate_equipment = () => {
    current_entities.players.forEach((character) => {
      character.equipment.forEach((element) => {
        character.health_max += element.health;
        character.mana_max += element.mana;
        character.health += element.health;
        character.mana += element.mana;
        character.strength += element.strength;
        character.agility += element.agility;
        character.intelligence += element.intelligence;
      });
      if (character.health > character.health_max) {
        character.health = character.health_max;
      }
      if (character.mana > character.mana_max) {
        character.mana = character.mana_max;
      }
    });
  };

  //* Add equipment stats
  calculate_equipment();

  //  Declare new zone (Future)

  //  Reset variables first
  current_fight();

  //  Declare monster(s) based on zone
  zone_control();

  //  Open battlescreen
  battleScreen();
};

export default create_battle;
