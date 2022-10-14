import $ from "jquery";
import axios from "axios";

import modchanges from "./modules/modchanges";
import current_entities from "./entities";

import rectangleh from "/assets/ui/rectangleh.jpg";
import redrectangle from "/assets/ui/redrectangle.png";

const modscreen = {
  modpack_id: "",

  current_modpack: {
    name: "",
    author: "",
    private: false,
    items: [],
    monsters: [],
    players: [],
    skills_list: [],
    zones: [],
  },

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

  mainscreen: function () {
    //  Append this screen on the black screen
    const $modscreen = $("<div>")
      .attr("id", "modscreen")
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

    const $modtitle = $("<h1>")
      .attr("id", "modtitle")
      .css({
        margin: "5vw 0 0 0",
        color: "rgba(72,72,72,255)",
        "font-family": "Alagard",
        "font-size": "3vw",
      })
      .text("Mods Settings");

    const $listholder = $("<div>").attr("id", "modlistholder").css({
      height: "60%",
      width: "90%",
      margin: "1vw 5vw 1vw 5vw",
      //   "background-color": "red",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "space-between",
    });

    const $mods_self = $("<div>")
      .attr("id", "modsself")
      .css({
        height: "100%",
        width: "52%",
        "background-color": "rgba(0,0,0,0.25)",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
      })
      .append(
        $("<div>")
          .css({
            display: "flex",
            "flex-direction": "row",
            "justify-content": "center",
            "align-items": "center",
            height: "15%",
            width: "100%",
          })
          .append(
            $("<div>")
              .css({ width: "30%" })
              .append(
                $("<h2>").text("My Mods").css({
                  "font-family": "Alagard",
                  "font-size": "2vw",
                  color: "rgba(72,72,72,255)",
                  "white-space": "nowrap",
                })
              ),
            $("<div>")
              .css({
                "min-width": "10vw",
                width: "30%",
                height: "80%",
                "background-image": `url("${redrectangle}")`,
                "background-size": "100% 100%",
                "background-repeat": "no-repeat",
                "object-fit": "contain",
              })
              .append(
                $("<button>")
                  .attr("id", `modbtnsave`)
                  .addClass("actionbutton")
                  .css(this.redbuttoncss)
                  .text("Create")
                  .on("click", () => {
                    console.log("Mod BtnCreate clicked");
                    $listholder.empty();

                    const $textarea = $("<textarea>")
                      .css({
                        width: "100%",
                        "background-color": "rgba(0,0,0,0.25)",
                        color: "rgba(72,72,72,255)",
                        overflow: "auto",
                        "font-size": "1.5vw",
                        "white-space": "pre-line",
                        "text-align": "initial",
                      })
                      .val(`${JSON.stringify(this.current_modpack, null, 4)}`);

                    const $buttonsave = $("<div>")
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
                          .attr("id", `modbtnsave`)
                          .addClass("actionbutton")
                          .css(this.redbuttoncss)
                          .text("SAVE")
                          .on("click", () => {
                            console.log("Mod BtnSave clicked");
                            console.dir($textarea[0].value);

                            const objectcheck = JSON.parse($textarea[0].value);
                            if (objectcheck.name == "") {
                              return $modtitle.text("Name is required");
                            }
                            try {
                              const user = JSON.parse(
                                localStorage.getItem("user")
                              );
                              const call = async () => {
                                const response = await axios.post(
                                  "/api/mods/create",
                                  {
                                    username: current_entities.username,
                                    accessToken: user.user.accessToken,
                                    mod: JSON.parse($textarea[0].value),
                                  }
                                );
                                console.dir(response);
                                if (response.data.status == 201) {
                                  console.log("Successful creation of mod");
                                  modchanges.current_modpack = JSON.parse(
                                    $textarea[0].value
                                  );
                                  modchanges.modpack_active = true;
                                  $modscreen.remove();
                                }
                              };
                              call();
                            } catch (err) {
                              console.log(err);
                            }
                          })
                      );
                    $listholder.append($textarea);
                    $buttonholder.append($buttonsave);
                  })
              )
          )
      );

    const $mods_self_show = $("<div>").attr("id", "modsselfshow").css({
      height: "80%",
      width: "100%",
      overflow: "auto",
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
    });

    const $mods_others = $("<div>")
      .attr("id", "modsothers")
      .css({
        height: "100%",
        width: "45%",
        "background-color": "rgba(0,0,0,0.25)",
      })
      .append(
        $("<div>")
          .css({ width: "100%" })
          .append(
            $("<h2>").text("Community Mods").css({
              "font-family": "Alagard",
              "font-size": "2vw",
              color: "rgba(72,72,72,255)",
              "white-space": "nowrap",
              "text-align": "center",
            })
          )
      );

    const $mods_others_show = $("<div>").attr("id", "modsothersshow").css({
      height: "80%",
      width: "100%",
      overflow: "auto",
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
    });

    //! Bottom button holder
    const $buttonholder = $("<div>").attr("id", "modbtnholder").css({
      height: "10%",
      width: "90%",
      margin: "0 5vw 0 5vw",
      //   "background-color": "blue",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      gap: "15vw",
    });

    const $buttonclear = $("<div>")
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
          .attr("id", `modbtnclear`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("CLEAR")
          .on("click", () => {
            console.log("Mod BtnClear clicked");
            modchanges.current_modpack = {
              items: [],
              monsters: [],
              players: [],
              skills_list: [],
              zones: [],
            };
            modchanges.modpack_active = false;
            $modscreen.remove();
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
          .attr("id", `modbtnsave`)
          .addClass("actionbutton")
          .css(this.redbuttoncss)
          .text("BACK")
          .on("click", () => {
            console.log("Mod BtnBack clicked");
            $modscreen.remove();
          })
      );

    const findallmods = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const response = await axios.post("/api/mods/all", {
          username: current_entities.username,
        });
        console.dir(response);
        if (response.data.status == 200) {
          const mymods = response.data.payload.filter(
            (mod) => mod.author == current_entities.username
          );
          console.dir(mymods);
          if (mymods.length > 0) {
            mymods.forEach((emod) => {
              const $mod_self = $("<div>")
                .attr("id", `${emod.name}`)
                .css({
                  width: "80%",
                  height: "20%",
                  display: "flex",
                  "flex-direction": "row",
                  "justify-content": "space-between",
                  "align-items": "center",
                  padding: "5%",
                  margin: "1.5vw 0 0 0",
                  border: "0.3vw solid rgba(72,72,72,255)",
                  "border-radius": "3vw",
                })
                .append(
                  $("<p>")
                    .css({
                      color: "rgba(72,72,72,255)",
                      "font-size": "1.5vw",
                      "text-align": "left",
                      "font-family": "Alagard",
                      "white-space": "pre-line",
                    })
                    .text(
                      `Name: ${emod.name}\nAuthor: ${emod.author}\nLikes: ${emod.likes.length}`
                    ),
                  $("<div>")
                    .css({
                      "min-width": "6vw",
                      width: "15%",
                      height: "60%",
                      "background-image": `url("${redrectangle}")`,
                      "background-size": "100% 100%",
                      "background-repeat": "no-repeat",
                      "object-fit": "contain",
                    })
                    .append(
                      $("<button>")
                        .attr("id", `${emod.name}edit`)
                        .addClass("actionbutton")
                        .css(this.redbuttoncss)
                        .text("Edit")
                        .on("click", () => {
                          console.log(`${emod.name} Edit clicked`);
                          const call = async () => {
                            try {
                              const response = await axios.post(
                                "/api/mods/name",
                                {
                                  id: emod._id,
                                }
                              );
                              console.dir(response);
                              if (response.data.status == 200) {
                                this.modpack_id = response.data.payload[0]._id;
                                console.log("Got back response");
                                console.dir(response.data.payload[0]);
                                this.current_modpack.name =
                                  response.data.payload[0].name;
                                this.current_modpack.author =
                                  response.data.payload[0].author;
                                this.current_modpack.private =
                                  response.data.payload[0].private;
                                this.current_modpack.items = structuredClone(
                                  response.data.payload[0].items
                                );
                                this.current_modpack.monsters = structuredClone(
                                  response.data.payload[0].monsters
                                );
                                this.current_modpack.players = structuredClone(
                                  response.data.payload[0].players
                                );
                                this.current_modpack.skills_list =
                                  structuredClone(
                                    response.data.payload[0].skills_list
                                  );
                                this.current_modpack.zones = structuredClone(
                                  response.data.payload[0].zones
                                );
                                $listholder.empty();

                                const $textarea = $("<textarea>")
                                  .css({
                                    width: "100%",
                                    "background-color": "rgba(0,0,0,0.25)",
                                    color: "rgba(72,72,72,255)",
                                    overflow: "auto",
                                    "font-size": "1.5vw",
                                    "white-space": "pre-line",
                                    "text-align": "initial",
                                  })
                                  .val(
                                    `${JSON.stringify(
                                      this.current_modpack,
                                      null,
                                      4
                                    )}`
                                  );

                                const $buttonsave = $("<div>")
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
                                      .attr("id", `modbtnsave`)
                                      .addClass("actionbutton")
                                      .css(this.redbuttoncss)
                                      .text("SAVE")
                                      .on("click", () => {
                                        console.log("Mod BtnSave clicked");
                                        console.dir($textarea[0].value);
                                        try {
                                          const user = JSON.parse(
                                            localStorage.getItem("user")
                                          );
                                          const call = async () => {
                                            const response = await axios.post(
                                              "/api/mods/edit",
                                              {
                                                username:
                                                  current_entities.username,
                                                accessToken:
                                                  user.user.accessToken,
                                                mod: JSON.parse(
                                                  $textarea[0].value
                                                ),
                                                id: this.modpack_id,
                                              }
                                            );
                                            console.dir(response);
                                            if (response.data.status == 201) {
                                              console.log(
                                                "Successful creation of mod"
                                              );
                                              modchanges.current_modpack =
                                                JSON.parse($textarea[0].value);
                                              modchanges.modpack_active = true;
                                              $modscreen.remove();
                                            }
                                          };
                                          call();
                                        } catch (err) {
                                          console.log(err);
                                        }
                                        modchanges.current_modpack = JSON.parse(
                                          $textarea[0].value
                                        );
                                        modchanges.modpack_active = true;
                                        $modscreen.remove();
                                      })
                                  );

                                $listholder.append($textarea);
                                $buttonholder.append($buttonsave);
                              }
                            } catch (err) {
                              console.log(err);
                            }
                          };
                          call();
                        })
                    ),
                  $("<div>")
                    .css({
                      "min-width": "6vw",
                      width: "15%",
                      height: "60%",
                      "background-image": `url("${redrectangle}")`,
                      "background-size": "100% 100%",
                      "background-repeat": "no-repeat",
                      "object-fit": "contain",
                    })
                    .append(
                      $("<button>")
                        .attr("id", `${emod.name}delete`)
                        .addClass("actionbutton")
                        .css(this.redbuttoncss)
                        .text("Delete")
                        .on("click", () => {
                          try {
                            const call = async () => {
                              const response = await axios.post(
                                "/api/mods/delete",
                                {
                                  username: current_entities.username,
                                  accessToken: user.user.accessToken,
                                  id: emod._id,
                                }
                              );
                              console.dir(response);
                              if (response.data.status == 200) {
                                console.log("Deleted");
                                modchanges.current_modpack = {
                                  items: [],
                                  monsters: [],
                                  players: [],
                                  skills_list: [],
                                  zones: [],
                                };
                                modchanges.modpack_active = false;
                                $modscreen.remove();
                              }
                            };
                            call();
                          } catch (err) {
                            console.log(err);
                          }
                        })
                    ),
                  $("<div>")
                    .css({
                      "min-width": "6vw",
                      width: "15%",
                      height: "60%",
                      "background-image": `url("${redrectangle}")`,
                      "background-size": "100% 100%",
                      "background-repeat": "no-repeat",
                      "object-fit": "contain",
                    })
                    .append(
                      $("<button>")
                        .attr("id", `${emod.name}select`)
                        .addClass("actionbutton")
                        .css(this.redbuttoncss)
                        .text("Select")
                        .on("click", () => {
                          console.log(`${emod.name} Select clicked`);
                          const call = async () => {
                            try {
                              const response = await axios.post(
                                "/api/mods/name",
                                {
                                  id: emod._id,
                                }
                              );
                              console.dir(response);
                              if (response.data.status == 200) {
                                this.modpack_id = response.data.payload[0]._id;
                                console.log("Got back response");
                                console.dir(response.data.payload[0]);
                                modchanges.current_modpack.name =
                                  response.data.payload[0].name;
                                modchanges.current_modpack.author =
                                  response.data.payload[0].author;
                                modchanges.current_modpack.private =
                                  response.data.payload[0].private;
                                modchanges.current_modpack.items =
                                  structuredClone(
                                    response.data.payload[0].items
                                  );
                                modchanges.current_modpack.monsters =
                                  structuredClone(
                                    response.data.payload[0].monsters
                                  );
                                modchanges.current_modpack.players =
                                  structuredClone(
                                    response.data.payload[0].players
                                  );
                                modchanges.current_modpack.skills_list =
                                  structuredClone(
                                    response.data.payload[0].skills_list
                                  );
                                modchanges.current_modpack.zones =
                                  structuredClone(
                                    response.data.payload[0].zones
                                  );
                              }
                              modchanges.modpack_active = true;
                              $modscreen.remove();
                            } catch (err) {
                              console.log(err);
                            }
                          };
                          call();
                        })
                    )
                );

              $mods_self_show.append($mod_self);
            });
          } else {
            $mods_self_show.text("No personal mods found").css({
              color: "rgba(72,72,72,255)",
              "font-size": "2vw",
              "text-align": "center",
            });
          }
          //*
          //!  Display all other mods
          //*
          const othermods = response.data.payload.filter(
            (mod) => mod.author !== current_entities.username
          );
          if (othermods.length > 0) {
            othermods.forEach((emod) => {
              const $mod_others = $("<div>")
                .attr("id", `${emod.name}`)
                .css({
                  width: "80%",
                  height: "20%",
                  display: "flex",
                  "flex-direction": "row",
                  "justify-content": "space-between",
                  "align-items": "center",
                  padding: "5%",
                  margin: "1.5vw 0 0 0",
                  border: "0.3vw solid rgba(72,72,72,255)",
                  "border-radius": "3vw",
                })
                .append(
                  $("<p>")
                    .css({
                      color: "rgba(72,72,72,255)",
                      "font-family": "Alagard",
                      "font-size": "1.5vw",
                      "text-align": "left",
                      "white-space": "pre-line",
                    })
                    .text(
                      `Name: ${emod.name}\nAuthor: ${emod.author}\nLikes: ${emod.likes.length}`
                    ),
                  $("<div>")
                    .css({
                      "min-width": "6vw",
                      width: "25%",
                      height: "80%",
                      "background-image": `url("${redrectangle}")`,
                      "background-size": "100% 100%",
                      "background-repeat": "no-repeat",
                      "object-fit": "contain",
                    })
                    .append(
                      $("<button>")
                        .attr("id", `${emod.name}view`)
                        .addClass("actionbutton")
                        .css(this.redbuttoncss)
                        .text("View")
                        .on("click", () => {
                          console.log(`${emod.name} View clicked`);
                          const call = async () => {
                            try {
                              const response = await axios.post(
                                "/api/mods/name",
                                {
                                  id: emod._id,
                                }
                              );
                              console.dir(response);
                              if (response.data.status == 200) {
                                this.modpack_id = response.data.payload[0]._id;
                                console.log("Got back response");
                                console.dir(response.data.payload[0]);
                                this.current_modpack.name =
                                  response.data.payload[0].name;
                                this.current_modpack.author =
                                  response.data.payload[0].author;
                                this.current_modpack.private =
                                  response.data.payload[0].private;
                                this.current_modpack.items = structuredClone(
                                  response.data.payload[0].items
                                );
                                this.current_modpack.monsters = structuredClone(
                                  response.data.payload[0].monsters
                                );
                                this.current_modpack.players = structuredClone(
                                  response.data.payload[0].players
                                );
                                this.current_modpack.skills_list =
                                  structuredClone(
                                    response.data.payload[0].skills_list
                                  );
                                this.current_modpack.zones = structuredClone(
                                  response.data.payload[0].zones
                                );
                              }
                              $listholder.empty();
                              $listholder
                                .css({
                                  "background-color": "rgba(0,0,0,0.25)",
                                  color: "rgba(72,72,72,255)",
                                  overflow: "auto",
                                  "font-size": "1.5vw",
                                  "white-space": "pre-line",
                                  "text-align": "initial",
                                })
                                .text(
                                  `${JSON.stringify(
                                    modchanges.current_modpack,
                                    null,
                                    4
                                  )}`
                                );
                            } catch (err) {
                              console.log(err);
                            }
                          };
                          call();
                        })
                    ),
                  $("<div>")
                    .css({
                      "min-width": "6vw",
                      width: "25%",
                      height: "80%",
                      "background-image": `url("${redrectangle}")`,
                      "background-size": "100% 100%",
                      "background-repeat": "no-repeat",
                      "object-fit": "contain",
                    })
                    .append(
                      $("<button>")
                        .attr("id", `${emod.name}select`)
                        .addClass("actionbutton")
                        .css(this.redbuttoncss)
                        .text("Select")
                        .on("click", () => {
                          console.log(`${emod.name} Select clicked`);
                          const call = async () => {
                            try {
                              const response = await axios.post(
                                "/api/mods/name",
                                {
                                  id: emod._id,
                                }
                              );
                              console.dir(response);
                              if (response.data.status == 200) {
                                this.modpack_id = response.data.payload[0]._id;
                                console.log("Got back response");
                                console.dir(response.data.payload[0]);
                                modchanges.current_modpack.name =
                                  response.data.payload[0].name;
                                modchanges.current_modpack.author =
                                  response.data.payload[0].author;
                                modchanges.current_modpack.private =
                                  response.data.payload[0].private;
                                modchanges.current_modpack.items =
                                  structuredClone(
                                    response.data.payload[0].items
                                  );
                                modchanges.current_modpack.monsters =
                                  structuredClone(
                                    response.data.payload[0].monsters
                                  );
                                modchanges.current_modpack.players =
                                  structuredClone(
                                    response.data.payload[0].players
                                  );
                                modchanges.current_modpack.skills_list =
                                  structuredClone(
                                    response.data.payload[0].skills_list
                                  );
                                modchanges.current_modpack.zones =
                                  structuredClone(
                                    response.data.payload[0].zones
                                  );
                              }
                              modchanges.modpack_active = true;
                              $modscreen.remove();
                            } catch (err) {
                              console.log(err);
                            }
                          };
                          call();
                        })
                    )
                );

              $mods_others_show.append($mod_others);
            });
          } else {
            $mods_others_show.text("No other mods found").css({
              color: "rgba(72,72,72,255)",
              "font-size": "2vw",
              "text-align": "center",
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    $("body").append($modscreen);
    $modscreen.append($modtitle, $listholder, $buttonholder);
    $buttonholder.append($buttonclear, $buttonback);

    if (modchanges.modpack_active) {
      $listholder
        .css({
          "background-color": "rgba(0,0,0,0.25)",
          color: "rgba(72,72,72,255)",
          overflow: "auto",
          "font-size": "1.5vw",
          "white-space": "pre-line",
          "text-align": "initial",
        })
        .text(`${JSON.stringify(modchanges.current_modpack, null, 4)}`);
    } else {
      $listholder.append($mods_self, $mods_others);
      $mods_self.append($mods_self_show);
      $mods_others.append($mods_others_show);
      findallmods();
    }
  },
};
export default modscreen;
