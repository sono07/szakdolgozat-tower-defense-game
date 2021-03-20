export const MAP_TILES_COL_COUNT = 10;
export const MAP_TILES_ROW_COUNT = 8;

export const TILE_EMPTY = 0;
export const TILE_CRATERS = 1;
export const TILE_TREES = 2;
export const TILE_ROAD_2WAY_STRAIGHT = 3;
export const TILE_ROAD_2WAY_CORNER = 4;
export const TILE_ROAD_3WAY = 5;
export const TILE_ROAD_4WAY = 6;

//TODO turret types
export const TILE_TURRET_BULLET_MK1 = 11
// export const TILE_TURRET_BULLET_MK2 = 12
// export const TILE_TURRET_BULLET_MK3 = 13
// ...

//avoiding double's precision loss by using factors of 2
export const ROTATION_DIVISOR = 16;
export const ROTATION_ZERO = 0 / ROTATION_DIVISOR;
export const ROTATION_90 = 1 / ROTATION_DIVISOR;
export const ROTATION_180 = 2 / ROTATION_DIVISOR;
export const ROTATION_270 = 3 / ROTATION_DIVISOR;