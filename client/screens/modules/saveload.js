import $ from "jquery";
// import axios from "axios";

//* Saveload files are initially retrieved and stored in the mods (2 slots)
// import current_entities from "./entities";
// import modchanges from "./modchanges";

import largehpanel from "/assets/ui/largehpanel.jpg"; //  Window
// import redrectangle from "/assets/ui/redrectangle.png"; //  Button
// import rectangleh from "/assets/ui/rectangleh.jpg"  // Using this as frame
// import characters_sheet_1 from "/assets/spritesheets/characters_sheet_1.png"    // Putting the character into the frame to serve as image
//* For future, in the event of multiple heroes, can change the z-index / position slightly as rendering heroes into the panel (to represent party)
//? Still make it go through the array

//  Save/load windows will have their text below the picture frame with: Mods loaded (if any, present in modchanges), save date, savefile name (in schema)

//* Will make initial load button on main screen to open the window
const saveload = {
  mainscreen: function () {
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

    $("body").append($saveloadscreen);
  },
};

export default saveload;
