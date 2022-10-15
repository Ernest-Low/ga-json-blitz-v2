import $ from "jquery";
import axios from "axios";

import items from "../data_files/data_items";
import skills_list from "../data_files/data_skills";
import current_entities from "./entities";

import players from "../data_files/data_players.js";
import zones from "../data_files/data_zone";
import create_battle from "./modules/create_battle";
import $account from "./modules/account";
import modscreen from "./modscreen";
import jsoninit from "./modules/jsoninit";
import modchanges from "./modules/modchanges";
import saveload from "./modules/saveload";

import background_img from "/assets/Game_Landing_Page.jpg";

//* Render Mainscreen (Aka main)
const mainScreen = async () => {
  //  Mainscreen cover
  const $mainscreen = $("<div>")
    .attr("id", "mainscreen")
    .css({
      display: "flex",
      "align-items": "flex-end",
      "justify-content": "center",
      "z-index": 1,
      "background-image": `url("${background_img}")`,
      // "background-image": `url("/assets/image_data/backgrounds/Game_Landing_Page.png")`,
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "object-fit": "fill",
      width: "80vw",
      "aspect-ratio": "16 / 9",
      // height: "95vh",
      border: "4px solid blue",
      overflow: "hidden",
      position: "absolute",
    });

  // Textholder div center-bottom
  const $textbox = $("<div>").attr("id", "maintextbox").css({
    display: "flex",
    "flex-direction": "column",
    "z-index": 2,
    width: "20%",
    height: "20%",
    overflow: "hidden",
    margin: "0 0 2.5% 0",
  });

  // const $inputname = $("<input>")
  //   .attr({
  //     type: "text",
  //     id: "inputname",
  //     placeholder: "Your Hero Name",
  //     value: "",
  //   })
  //   .css({
  //     color: "white",
  //     "background-color": "rgba(0,0,0,0.8)",
  //     "font-size": "1.5vw",
  //     width: "100%",
  //     height: "25%",
  //     "font-family": "Alagard",
  //     border: "none",
  //   });

  const $saveload = $("<button>")
    .addClass("actionbutton")
    .attr("id", "mainsaveload")
    .css({
      cursor: "pointer",
      "background-color": "rgba(0,0,0,0.8)",
      color: "white",
      "font-size": "1.5vw",
      "font-family": "Alagard",
      width: "100%",
      height: "25%",
    })
    .text("Load Game")
    .on("click", () => {
      console.log("Mainscreen Load clicked");
      saveload.mainscreen();
    });

  // Game start button
  const $gamestart = $("<button>")
    .addClass("actionbutton")
    .attr("id", "btnmainstart")
    .text("New Game")
    .css({
      cursor: "pointer",
      "background-color": "rgba(0,0,0,0.8)",
      color: "white",
      "font-size": "1.5vw",
      "font-family": "Alagard",
      width: "100%",
      height: "25%",
    })
    .on("click", () => {
      console.log("Start Clicked");

      //* Reset json state
      jsoninit();
      //! Put in mods!
      if (modchanges.modpack_active) {
        modchanges.updatelist();
      }

      //!  Call the player, temporary
      let copiedhero = structuredClone(players[0]);
      current_entities.players.push(copiedhero);
      current_entities.players[0].id = "p1";

      //! Assigning name for hero
      current_entities.players[0].name = "Guts";
      // current_entities.players[0].name = $("#inputname").val().trim() || "Guts";

      //! Staring weapon (Rusty Sword)
      const starting_weapon = items.filter((z) => z.id == 1001);
      current_entities.players[0].equipment.push(
        structuredClone(starting_weapon[0])
      );

      //! Starting Skill (Power Slash)
      const starting_skill = skills_list.filter((z) => z.id == 1);
      current_entities.players[0].skills.push(
        structuredClone(starting_skill[0])
      );

      //! Giving a healthpot to begin (id 4001)
      const starting_item = items.filter((z) => z.id == 4001);
      current_entities.items.push(structuredClone(starting_item[0]));

      //! Declaring castle zone (temp)
      const current_zone = zones.filter((z) => z.name == "Castle")[0];
      current_entities.zone = structuredClone(current_zone);

      $("#mainscreen").fadeOut(2000);
      setTimeout(() => {
        create_battle();
        $("#mainscreen").remove();
      }, 2000);
    });

  const $btnmods = $("<button>")
    .addClass("actionbutton")
    .attr("id", "btnmods")
    .text("Mods Settings")
    .css({
      cursor: "pointer",
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "100%",
      height: "25%",
      "font-family": "Alagard",
    })
    .on("click", () => {
      console.log("Mods Clicked");
      if (current_entities.username == "") {
        $account();
        current_entities.account_window = true;
      } else {
        modscreen.mainscreen();
      }
    });

  const $login = $("<button>")
    .addClass("actionbutton")
    .attr("id", "btnmainlogin")
    .text("Login / Register")
    .css({
      cursor: "pointer",
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "100%",
      height: "25%",
      "font-family": "Alagard",
    })
    .on("click", () => {
      console.log("Login Clicked");
      if (current_entities.account_window == false) {
        $account();
        current_entities.account_window = true;
      }
    });

  const $logout = $("<button>")
    .addClass("actionbutton")
    .attr("id", "btnmainlogout")
    .text("Logout")
    .css({
      cursor: "pointer",
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "100%",
      height: "25%",
      "font-family": "Alagard",
    })
    .on("click", () => {
      console.log("Logout Clicked");
      current_entities.username = "";
      localStorage.removeItem("user");
      $("#mainscreen").remove();
      mainScreen();
    });

  //! Add a axios call to check if JWT has expired or not

  $("body").append($mainscreen);
  $("#mainscreen").append($textbox);

  //  User account authentication / processes
  const user = JSON.parse(localStorage.getItem("user"));
  console.dir(user);
  if (user !== null) {
    console.log("Localstorage user is not null");
    try {
      const response = await axios.post("/api/refresh/", {
        username: user.user.username,
        accessToken: user.user.accessToken,
      });

      const localuser = {
        user: {
          username: user.user.username,
          accessToken: response.data.payload.accessToken,
        },
      };
      localStorage.setItem("user", JSON.stringify(localuser));
      current_entities.username = user.user.username;
      current_entities.savefiles_online = response.data.payload.savefiles;
      $("#maintextbox").append($gamestart, $btnmods, $logout);
    } catch (err) {
      console.log("Accesstoken Not valid");
      current_entities.username = "";
      localStorage.removeItem("user");
      $("#mainscreen").remove();
      mainScreen();
    }
  } else {
    console.log("Localstorage user is null");
    current_entities.username = "";
    $("#maintextbox").append($gamestart, $btnmods, $login);
  }

  //! Temporary: Seeding a local savefile
  // localStorage.setItem(
  //   "savefile",
  //   JSON.stringify({
  //     savefile: {
  //       name: "testsavefile",
  //       active: true,
  //       date: "October 16th 2022, 12:24:32am",
  //       modpack: "None",
  //       players: [
  //         {
  //           name: "LoadedWarrior",
  //           id: "p1",
  //           level: 0,
  //           exp: 0,
  //           exp_req: 100,
  //           health: 100,
  //           health_max: 100,
  //           mana: 20,
  //           mana_max: 20,
  //           crit_chance: 5,
  //           armor: 1,
  //           strength: 5,
  //           agility: 5,
  //           intelligence: 5,
  //           equipment: [
  //             {
  //               name: "Rusty Sword",
  //               id: 1001,
  //               drop_level: 2,
  //               rarity: "Common",
  //               damage: 4,
  //               damage_spill: 2,
  //               strength: 0,
  //               agility: 0,
  //               intelligence: 0,
  //               health: 0,
  //               mana: 0,
  //               scaling_str: 0.2,
  //               scaling_agi: 0,
  //               scaling_int: 0,
  //               type: "Melee",
  //               img_src: "image_data/icons/weapons/sword/sword_1.png",
  //               sprite_pos: [],
  //               gold_value: 50,
  //             },
  //           ],
  //           skills: [
  //             {
  //               name: "Power Slash",
  //               id: 1,
  //               health_cost: 0,
  //               mana_cost: 6,
  //               cooldown: 0,
  //               damage: 9,
  //               scaling_str: 0.5,
  //               scaling_agi: 0,
  //               scaling_int: 0,
  //               damage_spill: 2,
  //               type: "skill",
  //               weapon: "Melee",
  //               gold_cost: 50,
  //             },
  //           ],
  //           status: [],
  //           img_src: "character_sheet_1",
  //           model_size: ["10%", "35%"],
  //           sprite_pos: ["25%", "0%"],
  //           img_scale: [2, 2],
  //           img_translate: ["0%", "0%"],
  //         },
  //       ],
  //       gold: 100,
  //       items: [{}],
  //       zone: {
  //         name: "Castle",
  //         id: 3,
  //         level_range: [1, 4],
  //         enemy_type: [1, 2, 3, 4, 5, 6, 7],
  //         enemy_count: 8,
  //         random_zone: true,
  //         random_count: 18,
  //       },
  //     },
  //   })
  // );

  //  Check for savefile
  const localsavefile = JSON.parse(localStorage.getItem("savefile"));

  if (localsavefile !== null) {
    console.log("Savefiles found, load button");
    current_entities.savefiles_local[0] = structuredClone(
      localsavefile.savefile
    );
    $("#maintextbox").prepend($saveload);
    console.log("Show local saved files");
    console.dir(current_entities.savefiles_local[0]);
  }
};

export default mainScreen;
