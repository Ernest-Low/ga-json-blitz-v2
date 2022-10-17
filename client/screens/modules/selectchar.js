import $ from "jquery";
import gsap from "gsap";

import current_entities from "../entities";
import players from "../../data_files/data_players";
import zones from "../../data_files/data_zone";
import create_battle from "./create_battle";
import jsoninit from "./jsoninit";
import modchanges from "./modchanges";
import items from "../../data_files/data_items";

import character_sheet_1 from "/assets/spritesheets/characters_sheet_1.png";
import redrectangle from "/assets/ui/redrectangle.png";
import rectangleh from "/assets/ui/rectangleh.jpg";

const selectchar = {
  redbuttoncss: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
    color: "ghostwhite",
    "background-color": "rgba(255,255,255,0)",
    "font-size": "1.5vw",
    "text-align": "center",
    border: "none",
    "font-family": "Alagard",
  },

  selected_hero: {},

  mainscreen: function () {
    this.selected_hero = structuredClone(players[0]);
    const $charscreen = $("<div>")
      .attr("id", "charscreen")
      .css({
        position: "absolute",
        width: "80vw",
        "aspect-ratio": "16 / 9",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "z-index": 1,
        border: "4px solid blue",
        overflow: "hidden",
        "background-image": `url("${rectangleh}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "fill",
      });

    const $charscreentitle = $("<div>")
      .attr("id", "charscreentitle")
      .css({
        height: "8%",
        width: "100%",
        "text-align": "center",
        margin: "5vw 0 0 0",
        color: "rgba(72,72,72,255)",
        "font-family": "Alagard",
        "font-size": "3vw",
      })
      .text("PICK YOUR HERO");

    const $charcarousel = $("<div>").attr("id", "charcarousel").css({
      height: "65%",
      width: "90%",
      margin: "0.5vw 5vw 1vw 5vw",
      display: "flex",
      "align-items": "center",
      position: "relative",
      perspective: "53vw",
      translate: "0 -5rem",
      transform: "translate3d(-50%,-50%,32vw)",
      "transform-style": "preserve-3d",
    });

    const update_herotext = () => {
      $herotext.text(
        `Health: ${this.selected_hero.health_max}\nMana: ${this.selected_hero.mana_max}\nCrit Chance: ${this.selected_hero.crit_chance}%\nArmor: ${this.selected_hero.armor}\nStrength: ${this.selected_hero.strength}\nAgility: ${this.selected_hero.agility}\nIntelligence: ${this.selected_hero.intelligence}`
      );
    };

    players.forEach((character) => {
      console.log(character.name);

      const $character = $("<div>")
        .addClass("character")
        .attr("id", `pchar${character.d_id}`)
        .css({
          margin: "30vw 0 0 66vw",
          //   width: "100%",
          width: "10vw",
          height: "10vw",
          position: "absolute",
          scale: `${character.img_scale[0]} ${character.img_scale[1]}`,
          translate: `${character.img_translate[0]}% ${character.img_translate[1]}%`,
        })
        // .text(`${character.name}`)
        .on("click", () => {
          this.selected_hero = structuredClone(character);
          update_herotext();
          centerchar(character.d_id);
        });

      switch (character.img_src) {
        case "character_sheet_1":
          $character.css({
            "background-image": `url("${character_sheet_1}")`,
            "background-size": "500% 500%",
            "background-position": `${character.sprite_pos[0]} ${character.sprite_pos[1]}`,
          });
          break;
      }

      $charcarousel.append($character);
    });

    const $bottomarea = $("<div>").css({
      height: "35%",
      width: "90%",
      margin: "0 5vw 0 5vw",
      //   "background-color": "blue",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "space-between",
      translate: "0 -3vw",
    });

    const $herotext = $("<p>")
      .attr("id", "charherotext")
      .css({
        color: "rgba(72,72,72,255)",
        margin: "0 3vw 0 3vw",
        "font-family": "Alagard",
        "font-size": "1.5vw",
        "white-space": "pre-line",
      })
      .text(
        `Health: ${this.selected_hero.health_max}\nMana: ${this.selected_hero.mana_max}\nCrit Chance: ${this.selected_hero.crit_chance}%\nArmor: ${this.selected_hero.armor}\nStrength: ${this.selected_hero.strength}\nAgility: ${this.selected_hero.agility}\nIntelligence: ${this.selected_hero.intelligence}`
      );

    const $chardescription = $("<div>")
      .attr("id", "chardescription")
      .css({
        height: "100%",
        width: "30%",
      })
      .append($herotext);

    const $botmiddlesection = $("<div>").css({
      height: "100%",
      width: "30%",
      display: "flex",
      "flex-direction": "column",
      "justify-content": "space-evenly",
      "align-items": "center",
    });

    const $inputname = $("<input>")
      .attr({
        type: "text",
        id: "inputname",
        placeholder: "Your Hero Name",
        value: "",
      })
      .css({
        color: "white",
        "background-color": "rgba(0,0,0,0.8)",
        "font-size": "1.5vw",
        width: "80%",
        height: "20%",
        "font-family": "Alagard",
        border: "none",
      });

    const $botrightsection = $("<div>").css({
      height: "100%",
      width: "30%",
    });

    const $charbtnholder = $("<div>").attr("id", "charbtnholder").css({
      height: "30%",
      width: "100%",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      gap: "2vw",
    });

    const $buttonstart = $("<div>")
      .css({
        width: "40%",
        height: "70%",
        "background-image": `url("${redrectangle}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "contain",
      })
      .append(
        $("<button>")
          .attr("id", `charbtnstart`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("START")
          .on("click", () => {
            console.log("Charscreen Btnstart clicked");
            //* Reset json state
            jsoninit();
            //! Put in mods!
            if (modchanges.modpack_active) {
              modchanges.updatelist();
            }

            //!  Create player (single for now)
            current_entities.players.push(structuredClone(this.selected_hero));
            current_entities.players[0].id = "p1";

            //! Assigning name for hero
            current_entities.players[0].name =
              $inputname.val().trim() || this.selected_hero.name;

            //! Giving 2 healthpots (id 4001) and 1 manapot (id 4003) to begin
            const starting_item = items.filter((z) => z.id == 4001);
            current_entities.items.push(structuredClone(starting_item[0]));
            current_entities.items.push(structuredClone(starting_item[0]));
            const starting_item_2 = items.filter((z) => z.id == 4003);
            current_entities.items.push(structuredClone(starting_item_2[0]));

            //! Declaring castle zone (temp)
            const current_zone = zones.filter((z) => z.name == "Castle")[0];
            current_entities.zone = structuredClone(current_zone);

            //* Set game active (move to character screen when game actually starts)
            current_entities.game_active = true;

            $("#mainscreen").remove();
            $charscreen.fadeOut(2000);
            setTimeout(() => {
              create_battle();
              $("#mainscreen").remove();
              $charscreen.remove();
            }, 2000);
          })
      );

    const $buttonback = $("<div>")
      .css({
        width: "40%",
        height: "70%",
        "background-image": `url("${redrectangle}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "contain",
      })
      .append(
        $("<button>")
          .attr("id", `charbtnback`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("BACK")
          .on("click", () => {
            console.log("Charscreen BtnBack clicked");
            $charscreen.remove();
          })
      );

    //* Think of a way to calculate this based on number of player characters
    const positions = [
      [0, 1],
      [-60, -300],
      [-200, -500],
      [600, -500],
      [300, -300],
    ];

    const centerchar = (d_id) => {
      let id = d_id;
      const new_array = [id];
      for (let i = 1; i < positions.length; i++) {
        if (id == positions.length) id = 0;
        ++id;
        new_array.push(id);
      }

      for (let i = 0; i < positions.length; i++) {
        gsap.to(
          `#pchar${new_array[i]}`,
          1,
          { xPercent: positions[i][0], z: positions[i][1] },
          0
        );
      }
    };

    $("body").append($charscreen);
    $charscreen.append($charscreentitle, $charcarousel, $bottomarea);
    $bottomarea.append($chardescription, $botmiddlesection, $botrightsection);
    $botmiddlesection.append($inputname, $charbtnholder);
    $charbtnholder.append($buttonstart, $buttonback);
    centerchar(1);
  },
};
export default selectchar;
