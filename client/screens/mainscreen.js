import $ from "jquery";
import current_entities from "./entities";
import player from "../data_files/data_player.js";
import zones from "../data_files/data_zone";
import create_battle from "./modules/create_battle";
import $account from "./modules/account";

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
      width: "100%",
      height: "25%",
      "font-family": "Alagard",
      border: "none",
    });

  // Game start button
  const $gamestart = $("<button>")
    .addClass("actionbutton")
    .attr("id", "btnmainstart")
    .text("Start")
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

      //!  Call the player, temporary
      let copiedhero = JSON.parse(JSON.stringify(player));
      current_entities.players.push(copiedhero);
      current_entities.players[0].id = "p1";
      current_entities.players[0].name = $("#inputname").val().trim() || "Guts";
      //! Declaring castle zone (temp)
      current_entities.zone = JSON.parse(JSON.stringify(zones.castle));

      $("#mainscreen").fadeOut(2000);
      setTimeout(() => {
        create_battle();
        $("#mainscreen").remove();
      }, 2000);
    });

  const $gamesettings = $("<button>")
    .addClass("actionbutton")
    .attr("id", "btnmainsettings")
    .text("Settings / Mods")
    .css({
      cursor: "pointer",
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "100%",
      height: "25%",
      "font-family": "Alagard",
    })
    .on("click", () => console.log("Settings Clicked"));

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

  $("body").append($mainscreen);
  $("#mainscreen").append($textbox);
  const user = JSON.parse(localStorage.getItem("user"));
  console.dir(user);
  if (user !== null) {
    console.log("Localstorage user is not null");
    current_entities.username = user.user.username;
    $("#maintextbox").append($inputname, $gamestart, $gamesettings, $logout);
  } else {
    console.log("Localstorage user is null");
    $("#maintextbox").append($inputname, $gamestart, $gamesettings, $login);
  }
};

export default mainScreen;
