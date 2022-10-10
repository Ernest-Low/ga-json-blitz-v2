//!  Render character into scene

import character_info from "./infobox.js";
import monster_sheet_1 from "/assets/spritesheets/monster_sheet_1.png";

const $entity_window = (entity) => {
  //* Spritesheet constants
  const monster_sheet_1_length = 37;

  // const player1 = current_entities.players[0];
  const $infobox = character_info(entity);

  const $image = $("<div>")
    .attr("id", `${entity.id}image`)
    .css({
      width: "100%",
      height: "60%",
      "background-image": `url("${monster_sheet_1}")`,
      "background-size": "700% 600%",
      "background-position": "0% 0%",
      scale: `${entity.scale[0]} ${entity.scale[1]}`,
      translate: `${entity.img_translate[0]} ${entity.img_translate[1]}`,

    });


  const $entitybox = $("<div>")
    .attr("id", `${entity.id}box`)
    .css({
      width: entity.img_size[0],
      height: entity.img_size[1],
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
