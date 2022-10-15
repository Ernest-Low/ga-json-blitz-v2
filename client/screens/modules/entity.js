//!  Render character into scene
import $ from "jquery";
import character_info from "./infobox.js";

import monster_sheet_1 from "/assets/spritesheets/monster_sheet_1.png";
import character_sheet_1 from "/assets/spritesheets/characters_sheet_1.png";

const $entity_window = (entity) => {
  // const player1 = current_entities.players[0];
  const $infobox = character_info(entity);

  const $image = $("<div>")
    .attr("id", `${entity.id}image`)
    .css({
      width: "100%",
      height: "60%",
      scale: `${entity.img_scale[0]} ${entity.img_scale[1]}`,
      translate: `${entity.img_translate[0]}% ${entity.img_translate[1]}%`,
    });

  //* Spritesheet assignment
  switch (entity.img_src) {
    case "monster_sheet_1":
      $image.css({
        "background-image": `url("${monster_sheet_1}")`,
        "background-size": "700% 600%",
        "background-position": `${entity.sprite_pos[0]} ${entity.sprite_pos[1]}`,
      });
      break;
    case "character_sheet_1":
      $image.css({
        "background-image": `url("${character_sheet_1}")`,
        "background-size": "500% 500%",
        "background-position": `${entity.sprite_pos[0]} ${entity.sprite_pos[1]}`,
      });
      break;
    default:
      break;
  }

  const $entitybox = $("<div>")
    .attr("id", `${entity.id}box`)
    .css({
      width: entity.model_size[0],
      height: entity.model_size[1],
      display: "flex",
      "flex-direction": "column",
      "align-items": "flex-end",
      "justify-content": "flex-end",
      padding: "1vw",
    })
    .append($infobox, $image);

  console.log(entity);
  // setTimeout(() => {
  //   update_hpmp(entity, 0, 0);
  // }, 10);

  return $entitybox;
};

export default $entity_window;
