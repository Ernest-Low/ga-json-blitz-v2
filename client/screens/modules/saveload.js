import $ from "jquery";
import moment from "moment";
import axios from "axios";

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
  modpack_load_ok: false,
  savefile_selected: false,

  mainscreen: function () {
    // Reset Variables in case
    this.savefile_selected = false;
    this.selected_savefile = { name: "None" };
    this.modpack_load_ok = false;

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
            if (
              this.modpack_load_ok == true &&
              this.selected_savefile.active == true
            ) {
              //* Reset json state
              jsoninit();
              //! Put in mods!
              if (modchanges.modpack_active) {
                modchanges.updatelist();
              }
              //* Game is running now
              current_entities.game_active = true;
              //* Copy in load data
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
              //* Fade out screens, remove backscreens
              $("#mainscreen").remove();
              $("#afterscreen").remove();
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
            } else if (this.selected_savefile.active == false) {
              $saveloadwarning.text("Cannot load empty savefile");
            } else if (this.modpack_load_ok == true) {
              $saveloadwarning.text(
                "Unable to load, current modpack incompatiable"
              );
            }
          })
      );

    const manualrender = () => {
      let target = "";
      switch (this.selected_savefile.name) {
        case "Local Savefile":
          target = "local";
          break;
        case "Online Savefile 1":
          target = "online0";
          break;
        case "Online Savefile 2":
          target = "online1";
          break;
        default:
          target = "Error";
      }
      console.log(target);
      const $heropicture = $("<div>").css({
        margin: "2vw 0 0 0",
        width: "100%",
        height: "60%",
        scale: `${this.selected_savefile.players[0].img_scale[0] * 0.8} ${
          this.selected_savefile.players[0].img_scale[1] * 1.08
        }`,
        translate: `${this.selected_savefile.players[0].img_translate[0]}% ${this.selected_savefile.players[0].img_translate[1]}%`,
      });
      switch (this.selected_savefile.players[0].img_src) {
        case "character_sheet_1":
          $heropicture.css({
            "background-image": `url("${character_sheet_1}")`,
            "background-size": "500% 500%",
            "background-position": `${this.selected_savefile.players[0].sprite_pos[0]} ${this.selected_savefile.players[0].sprite_pos[1]}`,
          });
          break;
        default:
          break;
      }
      $(`#${target}heroframe`).empty();
      $(`#${target}heroframe`).append($heropicture);
      $(`#${target}savefiledesc`).text(
        `Date Saved: ${this.selected_savefile.date}\nModpack: ${this.selected_savefile.modpack}\nGold: ${this.selected_savefile.gold}\nCurrent Zone: ${this.selected_savefile.zone.name}`
      );
    };

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
            console.log("Save Button Pressed");
            if (this.selected_savefile.name == "None") {
              $saveloadwarning.text("Must select a save slot first");
            } else if (this.selected_savefile.name == "Local Savefile") {
              //* Save to local
              current_entities.savefiles_local[0].name = "Local Savefile";
              const save_item = {
                name: current_entities.savefiles_local[0].name,
                active: true,
                date: moment().format("MMMM Do YYYY, h:mm:ss a"),
                modpack: modchanges.current_modpack.name,
                players: structuredClone(current_entities.players),
                gold: current_entities.gold,
                items: structuredClone(current_entities.items),
                zone: structuredClone(current_entities.zone),
              };
              localStorage.setItem(
                "savefile",
                JSON.stringify({
                  savefile: save_item,
                })
              );
              current_entities.savefiles_local[0] = structuredClone(save_item);
              this.selected_savefile = structuredClone(save_item);
              manualrender();
              $saveloadwarning.text("Saved!");
            } else if (
              this.selected_savefile.name == "Online Savefile 1" ||
              this.selected_savefile.name == "Online Savefile 2"
            ) {
              let target = "";
              if (this.selected_savefile.name == "Online Savefile 1") {
                target = current_entities.savefiles_online[0];
              } else {
                target = current_entities.savefiles_online[1];
              }
              target.active = true;
              target.date = moment().format("MMMM Do YYYY, h:mm:ss a");
              target.modpack = modchanges.current_modpack.name;
              target.gold = current_entities.gold;
              target.players = structuredClone(current_entities.players);
              target.items = structuredClone(current_entities.items);
              target.zone = structuredClone(current_entities.zone);

              const save_item = [];
              current_entities.savefiles_online.forEach((x) => {
                save_item.push(structuredClone(x));
              });
              console.log("Sending save_item array");
              console.dir(save_item);
              const call = async () => {
                const user = JSON.parse(localStorage.getItem("user"));
                try {
                  const response = await axios.post("/api/saves/", {
                    id: user.user.id,
                    username: current_entities.username,
                    accessToken: user.user.accessToken,
                    savefiles: save_item,
                  });
                  if (response.data.status == 200) {
                    console.log("Success");
                    this.selected_savefile = structuredClone(target);
                    manualrender();
                    $saveloadwarning.text("Saved!");
                  }
                } catch (err) {
                  console.dir(err);
                  $saveloadwarning.text("Error Occured!");
                }
              };
              call();
            } else {
              $saveloadwarning.text("Error");
            }
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
      $saveloadwarning.text("");
      if (this.selected_savefile.modpack == "None") {
        if (modchanges.current_modpack.name == "None") {
          this.modpack_load_ok = true;
        } else {
          this.modpack_load_ok = false;
        }
      } else if (this.selected_savefile.modpack == "") {
        this.modpack_load_ok = true;
      } else {
        if (modchanges.current_modpack.name != this.selected_savefile.modpack) {
          this.modpack_load_ok = false;
        } else {
          this.modpack_load_ok = true;
        }
      }
    };

    const $localsave = $("<div>")
      .attr("id", "localsave")
      .on("click", () => {
        console.log("Localsave clicked");
        if (
          this.selected_savefile.name !=
          current_entities.savefiles_local[0].name
        ) {
          $(".selectedsave").removeClass("selectedsave");
          $localsave.addClass("selectedsave");
          console.log("Setting local to selected");
          this.selected_savefile = structuredClone(
            current_entities.savefiles_local[0]
          );
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

    const $heroframe = $("<div>")
      .attr("id", "localheroframe")
      .css({
        width: "10vw",
        height: "10vw",
        "background-image": `url("${rectangleh}")`,
        "background-size": "100% 100%",
        "background-repeat": "no-repeat",
        "object-fit": "fill",
      });

    const $savefiledesc = $("<p>")
      .attr("id", "localsavefiledesc")
      .css({
        margin: "2vw 1vw 0 1vw",
        color: "ghostwhite",
        "font-family": "Alagard",
        "font-size": "1.5vw",
        "text-align": "left",
        "white-space": "pre-line",
      })
      .text("Empty Save file");

    $localsave.append($heroframe, $savefiledesc);

    if (current_entities.savefiles_local[0].active == true) {
      $savefiledesc.text(
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
    }

    if (current_entities.username != "") {
      current_entities.savefiles_online.forEach((savefile) => {
        const $onlinesave = $("<div>")
          .attr("id", `${savefile.name}onlinesave`)
          .on("click", () => {
            console.log(`${savefile.name} Clicked`);
            if (this.selected_savefile.name != savefile.name) {
              $(".selectedsave").removeClass("selectedsave");
              $onlinesave.addClass("selectedsave");
              console.log(`Setting ${savefile.name} to selected`);
              this.selected_savefile = structuredClone(savefile);
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

        const $heroframe = $("<div>")
          .attr(
            "id",
            `online${current_entities.savefiles_online.indexOf(
              savefile
            )}heroframe`
          )
          .css({
            width: "10vw",
            height: "10vw",
            "background-image": `url("${rectangleh}")`,
            "background-size": "100% 100%",
            "background-repeat": "no-repeat",
            "object-fit": "fill",
          });

        const $savefiledesc = $("<p>")
          .attr(
            "id",
            `online${current_entities.savefiles_online.indexOf(
              savefile
            )}savefiledesc`
          )
          .css({
            margin: "2vw 1vw 0 1vw",
            color: "ghostwhite",
            "font-family": "Alagard",
            "font-size": "1.5vw",
            "text-align": "left",
            "white-space": "pre-line",
          })
          .text("Empty Save File");

        $onlinesave.append($heroframe, $savefiledesc);

        if (savefile.active == true) {
          $savefiledesc.text(
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
