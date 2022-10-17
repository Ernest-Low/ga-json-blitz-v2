//*  Actions window
//! Attack, Skills, Items, Run
import $ from "jquery";
import player_actions from "../scene_control/playeractions.js";
import current_entities from "../entities.js";
import actionSkills from "./actionSkills.js";
import create_actionText from "./create_actiontext.js";
import iteminfo from "./iteminfo.js";
import itemusage from "./itemusage.js";

import redrectangle from "/assets/ui/redrectangle.png";

const $actions = () => {
  //  CSS For Buttons
  const button_css = {
    cursor: "pointer",
    width: "50%",
    height: "100%",
    color: "ghostwhite",
    "background-color": "rgba(255,255,255,0)",
    "font-size": "1.5vw",
    "text-align": "center",
    border: "none",
    "font-family": "Alagard",
  };

  //  Basic Attack
  const $attack = $("<button>")
    .attr("id", "btnattack")
    .addClass("actionbutton")
    .css(button_css)
    .text("ATTACK")
    .on("click", () => {
      console.log("Attacking");
      if (current_entities.current_turn == "player") {
        if (current_entities.skillbar_status == true) {
          $("#skillscontainer").remove();
          create_actionText();
          current_entities.skillbar_status = false;
        }
        if (current_entities.itemsbar_status == true) {
          $("#itemlistbox").remove();
          create_actionText();
          current_entities.itemsbar_status = false;
        }
        create_actionText();
        player_actions.player_attack(
          current_entities.players[current_entities.currentplayer],
          current_entities.monsters[current_entities.currentmonster]
        );
      }
    });

  //  Open Skills
  const $skills = $("<button>")
    .attr("id", "btnskills")
    .addClass("actionbutton")
    .css(button_css)
    .text("SKILLS")
    .on("click", () => {
      console.log("Using a skill");
      if (current_entities.current_turn == "player") {
        if (current_entities.skillbar_status == false) {
          if (current_entities.itemsbar_status == true) {
            $("#itemlistbox").remove();
            current_entities.itemsbar_status = false;
          }
          console.log("removing text and enabling skills");
          $("#actiontext").remove();
          actionSkills();
          current_entities.skillbar_status = true;
        } else {
          console.log("adding text and disabling skills");
          $("#skillscontainer").remove();
          create_actionText();
          current_entities.skillbar_status = false;
        }
      }
    });

  //* Let's make arrows to go through the entries (view sets of 4)
  //? Potentially stack items
  const create_items = () => {
    //  List of items
    const $itemlistbox = $("<div>").attr("id", "itemlistbox").css({
      width: "50vw",
      height: "500%",
      position: "absolute",
      display: "flex",
      "flex-direction": "column",
      "z-index": 3,
    });

    const $itemslist = $("<div>").attr("id", "actionitemlist").css({
      width: "50vw",
      height: "4%",
      margin: "1vw 1vw 1vw 1vw",
      display: "flex",
      // "background-color": "blue",
      // translate: "10vw 0",
      "align-self": "flex-end",
      "justify-content": "flex-start",
      gap: "0.5vw 1vw",
      "flex-flow": "row wrap",
      "text-align": "center",
      // overflow: "auto",
    });

    const consumables = current_entities.items.filter(
      (item) => item.id >= 4001 && item.id <= 5000
    );

    consumables.forEach((item) => {
      const $itembox = $("<div>")
        .css({
          width: "45%",
          height: "45%",
          "background-image": `url("${redrectangle}")`,
          "background-size": "100% 100%",
          "background-repeat": "no-repeat",
          "object-fit": "contain",
          "align-items": "center",
        })
        .on("click", () => {
          //* Item on click event
          console.log(item.name);
          $itemlistbox.remove();
          create_actionText();
          itemusage.itemretrieve(item);
        })
        .append(
          $("<div>")
            .addClass("actionbutton")
            .css({
              width: "100%",
              height: "100%",
            })
            .append(
              iteminfo.item_link(item).addClass("divbutton").css({
                //  translate: "0 -1vw",
                "font-size": "1.5vw",
              })
            )
        );

      $itemslist.append($itembox);
    });
    $itemlistbox.append($itemslist);
    $("#longpanel").append($itemlistbox);
  };

  //  Open Items
  const $items = $("<button>")
    .attr("id", "btnitems")
    .addClass("actionbutton")
    .css(button_css)
    .text("ITEMS")
    .on("click", () => {
      console.log("Using an item");
      if (
        current_entities.itemsbar_status == false &&
        current_entities.current_turn == "player"
      ) {
        current_entities.itemsbar_status = true;
        if (current_entities.skillbar_status == true) {
          $("#skillscontainer").remove();
          current_entities.skillbar_status = false;
        } else {
          $("#actiontext").remove();
        }
        create_items();
      } else {
        $("#actionitemlist").remove();
        create_actionText();
        current_entities.itemsbar_status = false;
      }
    });

  //  Run away?!
  const $run = $("<button>")
    .attr("id", "btnrun")
    .addClass("actionbutton")
    .css(button_css)
    .text("RUN")
    .on("click", () => {
      console.log("Running");
      console.log("Dev code: Adding 300 Strength");
      current_entities.players[current_entities.currentplayer].strength += 300;
    });

  //  Attack / Skills holding box
  const $topbox = $("<div>")
    .attr("id", "actionstopbox")
    .css({
      display: "flex",
      width: "100%",
      height: "50%",
      overflow: "hidden",
      "flex-direction": "row",
    })
    .append($attack, $skills);

  //  Items / Run holding box
  const $botbox = $("<div>")
    .attr("id", "actionstopbox")
    .css({
      display: "flex",
      width: "100%",
      height: "50%",
      overflow: "hidden",
      "flex-direction": "row",
    })
    .append($items, $run);

  //  All 4 buttons holding box
  const $actionsone = $("<div>")
    .attr("id", "actionsone")
    .css({
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      "flex-direction": "column",
    })
    .append($topbox, $botbox);

  return $actionsone;
};

export default $actions;
