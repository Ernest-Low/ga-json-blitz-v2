//* Starting zone: Castle (for now)
//* Enemies by ID type + range in future
//* For now, specifiy exactly what enemy goes in

// name: { type: String, required: true },
// name2: { type: String, required: true }, //  Look through code to find out where this was used?!
// id: { type: Number, required: true },
// level_range: { type: [Number], required: true },
// enemy_type: { type: [Number], required: true },
// enemy_count: { type: Number, required: true },
// random_zone: { type: Boolean, default: true },
// random_count: { type: Number, required: true }, // How many zone pictures are there

const zones = {
  forest: {
    name: "Forest",
    name2: "forest",
    id: 1,
    level_range: [1, 3],
    enemy_type: [1, 2, 3, 4],
    enemy_count: 8,
    random_zone: false,
    img_src: "image_data/backgrounds/Zone_1_Background.png",
  },
  ice_cave: {
    name: "Ice Cave",
    name2: "ice_cave",
    id: 2,
    level_range: [1, 3],
    enemy_type: [1, 2, 3, 4],
    enemy_count: 8,
    random_zone: true,
    random_count: 9,
    img_src: "image_data/backgrounds/Ice_Cave_9.png",
  },
  castle: {
    name: "Castle",
    id: 3,
    level_range: [1, 4],
    enemy_type: [1, 2, 3, 4, 5, 6, 7],
    enemy_count: 8,
    random_zone: true,
    random_count: 18,
    // img_src: "castle_",
  },
};

// url('../image_data/backgrounds/
//* Default URL from battlescene
//* Append .png') at end
export default zones;
