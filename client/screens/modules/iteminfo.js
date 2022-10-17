//! To return a string containing item information (based on itemid)
//* Mostly for use in tooltip for shop / item drops / inventory

// Misc Item IDs: 1 - 1000
// Weapon Item IDs: 1001 - 2000
// Armor Item IDs: 2001 - 3000         (Extra)
// Accessories Item IDs: 3001 - 4000   (Extra)
// Consumables:    4001 - 5000

//! Maybe add a method to return the wrapping item too?

import $ from "jquery";

import itemframe from "/assets/ui/itemframe.png";
import rectanglevpanel from "/assets/ui/rectanglevpanel.png";
import consumables_spritesheet_1 from "/assets/spritesheets/consumables_spritesheet_1.png";
import weapons_spritesheet_1 from "/assets/spritesheets/weapons_spritesheet_1.png";

const iteminfo = {
  //* Item name & tooltip
  item_link: function (obj) {
    //  Get a string for item tooltip
    const item_info = (item) => {
      if (item.id >= 1001 && item.id <= 2000) {
        //* Weapon
        const text = `Item Name: ${item.name}\nRarity: ${
          item.rarity
        }\nDamage: ${item.damage - item.damage_spill} - ${
          item.damage + item.damage_spill
        }\nType: ${item.type}\nValue: ${
          item.gold_value
        }\n\nAttribute Gain / Scaling\nStrength: ${item.strength} (${
          item.scaling_str
        })\nAgility: ${item.agility} (${item.scaling_agi})\nIntelligence: ${
          item.intelligence
        } (${item.scaling_int})`;

        return text;
      } else if (item.id >= 4001 && item.id <= 5000) {
        //* Consumable
        const text = `Item Name: ${item.name}\nRarity: ${item.rarity}\nType: ${item.type}\nPotency: ${item.potency}\nValue: ${item.gold_value}`;

        return text;
      }
    };

    const tooltip = item_info(obj);

    const $itempicture = $("<div>").css({
      width: "100%",
      height: "100%",
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "object-fit": "fill",
    });

    const $itemframe = $("<div>")
      .css({
        width: "10vw",
        height: "10vw",
        "background-image": `url("${itemframe}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "fill",
      })
      .append($itempicture);

    //* Spritesheet assignment
    switch (obj.img_src) {
      case "consumables_spritesheet_1":
        $itempicture.css({
          "background-image": `url("${consumables_spritesheet_1}")`,
          "background-size": "400% 400%",
          "background-position": `${obj.sprite_pos[0]} ${obj.sprite_pos[1]}`,
        });
        break;
      case "weapons_spritesheet_1":
        $itempicture.css({
          "background-image": `url("${weapons_spritesheet_1}")`,
          "background-size": "800% 700%",
          "background-position": `${obj.sprite_pos[0]} ${obj.sprite_pos[1]}`,
        });
        break;
      default:
        break;
    }

    const $itemname = $("<p>")
      .addClass("tooltip")
      .attr("id", `itemid${obj.id}`)
      .css({
        cursor: "pointer",
        color: "ghostwhite",
        "font-family": "Alagard",
        "font-size": "2vw",
        "text-align": "center",
        "text-decoration": "none",
        border: "none",
      })
      .text(`${obj.name}`)
      .append(
        $("<div>")
          .addClass("tooltipbox")
          .css({
            "background-image": `url("${rectanglevpanel}")`,
            "background-size": "100% 100%",
            "background-repeat": "no-repeat",
            "object-fit": "contain",
          })
          .append($itemframe, $("<p>").addClass("tooltiptext").text(tooltip))
      );

    return $itemname;
  },
};

export default iteminfo;
