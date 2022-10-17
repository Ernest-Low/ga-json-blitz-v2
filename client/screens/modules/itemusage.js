import current_entities from "../entities";
import update_hpmp from "./update_hpmp";
import $actionText from "./actionText";
import turn_control from "../scene_control/turn_control";

const itemusage = {
  used_item: {},
  user: {},
  target: {},

  player_turn_done: function () {
    current_entities.current_turn = "inbetween";
    //  Seconds till enemy turn
    turn_control.player_turn(2.5);
  },

  health_potion: function () {
    //  HP Potion
    let potency = 0;
    if (this.user.health + this.used_item.potency > this.user.health_max) {
      potency = this.user.health_max - this.user.health;
    } else {
      potency = this.used_item.potency;
    }
    update_hpmp(this.user, potency * -1, 0);
    $actionText(
      `You used a ${this.used_item.name}, recovering ${potency} health!`,
      0.8
    );
    this.player_turn_done();
  },

  mana_potion: function () {
    //  MP Potion
    let potency = 0;
    if (this.user.mana + this.used_item.potency > this.user.mana_max) {
      potency = this.user.mana_max - this.user.mana;
    } else {
      potency = this.used_item.potency;
    }
    update_hpmp(this.user, 0, potency * -1);
    $actionText(
      `You used a ${this.used_item.name}, recovering ${potency} mana!`,
      0.8
    );
    this.player_turn_done();
  },

  itemretrieve: function (
    item,
    target = current_entities.players[current_entities.currentplayer],
    user = current_entities.players[current_entities.currentplayer]
  ) {
    //* May need changes in future based on aoe-cases
    this.used_item = structuredClone(item);
    this.target = target;
    this.user = user;

    //* Item used (Fix in future in event of multiple-charges of item)
    current_entities.items.splice(current_entities.items.indexOf(item), 1);

    switch (item.type) {
      case "Health":
        this.health_potion();
        break;
      case "Mana":
        this.mana_potion();
        break;
      default:
        console.log("Error");
    }
  },
};

export default itemusage;
