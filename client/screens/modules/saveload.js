import $ from "jquery";
// const moment = require('moment');
// import axios from "axios";

//* Saveload files are initially retrieved and stored in the mods (2 slots)
import current_entities from "../entities";
import create_battle from "./create_battle";
import modchanges from "./modchanges";
import jsoninit from "./jsoninit";

import largehpanel from "/assets/ui/largehpanel.jpg"; //  Window
import redrectangle from "/assets/ui/redrectangle.png"; //  Button
import rectangleh from "/assets/ui/rectangleh.jpg"; // Using this as frame
import character_sheet_1 from "/assets/spritesheets/characters_sheet_1.png";
//  Save/load windows will have their text below the picture frame with: Mods loaded (if any, present in modchanges), save date, savefile name (in schema)

//  Savebutton to not appear if no current game (access from mainscreen)

//* Will make initial load button on main screen to open the window, and after each fight
const saveload = {
  redbuttoncss: {
    cursor: "pointer",
    width: "100%",
    height: "100%",
    color: "ghostwhite",
    "font-size": "1.5vw",
    "text-align": "center",
    border: "none",
    "font-family": "Alagard",
    "background-color": "rgba(0,0,0,0)",
  },

  selected_savefile: { name: "None" },
  modpack_ok: false,
  savefile_selected: false,

  mainscreen: function () {
    // Reset Variables in case
    this.savefile_selected = false;
    this.selected_savefile = { name: "None" };
    this.modpack_ok = false;

    const $saveloadscreen = $("<div>")
      .attr("id", "saveloadscreen")
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
        "background-image": `url("${largehpanel}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "fill",
      });

    const $saveloadtitle = $("<div>")
      .attr("id", "saveloadtitle")
      .css({
        height: "8%",
        width: "100%",
        "text-align": "center",
        margin: "1.5vw 0 0 0",
        color: "ghostwhite",
        "font-family": "Alagard",
        "font-size": "3vw",
      })
      .text("Save/Load");

    const $saveloadsections = $("<div>").attr("id", "saveloadsections").css({
      height: "65%",
      width: "90%",
      margin: "0.5vw 5vw 1vw 5vw",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "space-evenly",
    });

    const $saveloadbtnholder = $("<div>").attr("id", "saveloadbtnholder").css({
      height: "8%",
      width: "90%",
      margin: "0 5vw 0 5vw",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      gap: "15vw",
    });

    const $saveloadwarning = $("<div>")
      .attr("id", "saveloadwarning")
      .css({
        height: "8%",
        width: "90%",
        margin: "0vw 5vw 0 5vw",
        "text-align": "center",
        color: "ghostwhite",
        "font-family": "Alagard",
        "font-size": "2vw",
      })
      .text("");

    const $loadbutton = $("<div>")
      .css({
        width: "15%",
        height: "60%",
        "background-image": `url("${redrectangle}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "contain",
      })
      .append(
        $("<button>")
          .attr("id", `saveloadbtnload`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("LOAD")
          .on("click", () => {
            console.log("Local Load Button Pressed");
            if (this.modpack_ok == true && this.savefile_selected == true) {
              //* Reset json state
              jsoninit();
              //! Put in mods!
              if (modchanges.modpack_active) {
                modchanges.updatelist();
              }
              current_entities.players = structuredClone(
                this.selected_savefile.players
              );
              current_entities.items = structuredClone(
                this.selected_savefile.items
              );
              current_entities.zone = structuredClone(
                this.selected_savefile.zone
              );
              current_entities.gold = this.selected_savefile.gold;
              $("#mainscreen").remove();
              $saveloadscreen.css({
                "z-index": 2,
              });
              $saveloadscreen.fadeOut(2000);

              //*
              //! Best to not send them into battle again straightaway, send them to a rest screen where they can re-organise
              //*
              setTimeout(() => {
                create_battle();
                $saveloadscreen.remove();
              }, 2000);
            }
          })
      );

    const $savebutton = $("<div>")
      .css({
        width: "15%",
        height: "60%",
        "background-image": `url("${redrectangle}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "contain",
      })
      .append(
        $("<button>")
          .attr("id", `saveloadbtnsave`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("SAVE")
          .on("click", () => {
            console.log("Local Load Button Pressed");
            $("#mainscreen").remove();
            $saveloadscreen.css({
              "z-index": 2,
            });
            $saveloadscreen.fadeOut(2000);
            setTimeout(() => {
              create_battle();
              $saveloadscreen.remove();
            }, 2000);
          })
      );

    const $buttonback = $("<div>")
      .css({
        width: "15%",
        height: "60%",
        "background-image": `url("${redrectangle}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "contain",
      })
      .append(
        $("<button>")
          .attr("id", `saveloadbtnback`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("BACK")
          .on("click", () => {
            console.log("Saveload BtnBack clicked");
            $saveloadscreen.remove();
          })
      );

    const modcheck = () => {
      console.log(
        `Checking modpack compatiability: ${modchanges.current_modpack.name} against ${this.selected_savefile.modpack}`
      );
      if (this.selected_savefile.modpack != "None") {
        if (modchanges.current_modpack.name != this.selected_savefile.modpack) {
          $saveloadwarning.text(
            "Unable to load, current modpack incompatiable"
          );
          this.modpack_ok = false;
        } else {
          this.modpack_ok = true;
          $saveloadwarning.text("");
        }
      } else {
        if (modchanges.current_modpack.name == "None") {
          this.modpack_ok = true;
          $saveloadwarning.text("");
        } else {
          this.modpack_ok = false;
          $saveloadwarning.text("Unable to load, savefile does not use mods");
        }
      }
    };

    const $localsave = $("<div>")
      .attr("id", "localsave")
      .on("click", () => {
        console.log("Localsave clicked");
        if (
          this.selected_savefile.name != current_entities.savefiles_local.name
        ) {
          console.log("Setting local to selected");
          this.selected_savefile = structuredClone(
            current_entities.savefiles_local[0]
          );
          $(".selectedsave").removeClass("selectedsave");
          $localsave.addClass("selectedsave");
          modcheck();
          this.savefile_selected = true;
        }
      })
      .css({
        order: -1,
        height: "100%",
        width: "30%",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        border: "0.5vw solid black",
        "border-radius": "1vw",
      })
      .append(
        $("<h2>")
          .css({
            margin: "1vw 1vw 1vw 1vw",
            "text-align": "center",
            color: "ghostwhite",
            "font-family": "Alagard",
            "font-size": "1.5vw",
          })
          .text("Local Savefile")
      );

    const $heroframe = $("<div>").css({
      width: "10vw",
      height: "10vw",
      "background-image": `url("${rectangleh}")`,
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "object-fit": "fill",
    });

    $localsave.append($heroframe);

    if (current_entities.savefiles_local[0].active == true) {
      const $savefiledesc = $("<p>")
        .css({
          margin: "2vw 1vw 0 1vw",
          color: "ghostwhite",
          "font-family": "Alagard",
          "font-size": "1.5vw",
          "text-align": "left",
          "white-space": "pre-line",
        })
        .text(
          `Date Saved: ${current_entities.savefiles_local[0].date}\nModpack: ${current_entities.savefiles_local[0].modpack}\nGold: ${current_entities.savefiles_local[0].gold}\nCurrent Zone: ${current_entities.savefiles_local[0].zone.name}`
        );

      const $heropicture = $("<div>").css({
        margin: "2vw 0 0 0",
        width: "100%",
        height: "60%",
        scale: `${
          current_entities.savefiles_local[0].players[0].img_scale[0] * 0.8
        } ${
          current_entities.savefiles_local[0].players[0].img_scale[1] * 1.08
        }`,
        translate: `${current_entities.savefiles_local[0].players[0].img_translate[0]}% ${current_entities.savefiles_local[0].players[0].img_translate[1]}%`,
      });
      switch (current_entities.savefiles_local[0].players[0].img_src) {
        case "character_sheet_1":
          $heropicture.css({
            "background-image": `url("${character_sheet_1}")`,
            "background-size": "500% 500%",
            "background-position": `${current_entities.savefiles_local[0].players[0].sprite_pos[0]} ${current_entities.savefiles_local[0].players[0].sprite_pos[1]}`,
          });
          break;
        default:
          break;
      }

      $heroframe.append($heropicture);
      $localsave.append($savefiledesc);
    }

    if (current_entities.username != "") {
      current_entities.savefiles_online.forEach((savefile) => {
        const $onlinesave = $("<div>")
          .attr("id", `${savefile.name}onlinesave`)
          .on("click", () => {
            console.log(`${savefile.name} Clicked`);
            if (this.selected_savefile.name != savefile.name) {
              console.log(`Setting ${savefile.name} to selected`);
              this.selected_savefile = structuredClone(savefile);
              $(".selectedsave").removeClass("selectedsave");
              $onlinesave.addClass("selectedsave");
              modcheck();
              this.savefile_selected = true;
            }
          })
          .css({
            height: "100%",
            width: "30%",
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            border: "0.5vw solid black",
            "border-radius": "1vw",
          })
          .append(
            $("<h2>")
              .css({
                margin: "1vw 1vw 1vw 1vw",
                "text-align": "center",
                color: "ghostwhite",
                "font-family": "Alagard",
                "font-size": "1.5vw",
              })
              .text(`${savefile.name}`)
          );

        const $heroframe = $("<div>").css({
          width: "10vw",
          height: "10vw",
          "background-image": `url("${rectangleh}")`,
          "background-size": "100% 100%",
          "background-repeat": "no-repeat",
          "object-fit": "fill",
        });

        $onlinesave.append($heroframe);

        if (savefile.active == true) {
          const $savefiledesc = $("<p>")
            .css({
              margin: "2vw 1vw 0 1vw",
              color: "ghostwhite",
              "font-family": "Alagard",
              "font-size": "1.5vw",
              "text-align": "left",
              "white-space": "pre-line",
            })
            .text(
              `Date Saved: ${savefile.date}\nModpack: ${savefile.modpack}\nGold: ${savefile.gold}\nCurrent Zone: ${savefile.zone.name}`
            );

          const $heropicture = $("<div>").css({
            margin: "2vw 0 0 0",
            width: "100%",
            height: "60%",
            scale: `${savefile.players[0].img_scale[0] * 0.8} ${
              savefile.players[0].img_scale[1] * 1.08
            }`,
            translate: `${savefile.players[0].img_translate[0]}% ${savefile.players[0].img_translate[1]}%`,
          });
          switch (savefile.players[0].img_src) {
            case "character_sheet_1":
              $heropicture.css({
                "background-image": `url("${character_sheet_1}")`,
                "background-size": "500% 500%",
                "background-position": `${savefile.players[0].sprite_pos[0]} ${savefile.players[0].sprite_pos[1]}`,
              });
              break;
            default:
              break;
          }
          $heroframe.append($heropicture);
          $onlinesave.append($savefiledesc);
        }
        $saveloadsections.append($onlinesave);
      });
    } else {
      $saveloadwarning.text("Log in to use online save slots!");
    }

    if (current_entities.game_active == true) {
      $saveloadbtnholder.append($savebutton);
    }

    $("body").append($saveloadscreen);
    $saveloadscreen.append(
      $saveloadtitle,
      $saveloadsections,
      $saveloadwarning,
      $saveloadbtnholder
    );
    $saveloadbtnholder.append($loadbutton, $buttonback);
    $saveloadsections.append($localsave);
  },
};

export default saveload;
