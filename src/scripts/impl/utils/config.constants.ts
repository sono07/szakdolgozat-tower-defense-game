//TODO these values should be fine tuned

import { FlatSlowEffect } from "../effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "../effect/instant-effect/flat-damage-effect.class";

export const GAME_WIDTH_PIXELS = 960;
export const GAME_HEIGHT_PIXELS = 720;

export const MAP_TILES_COL_COUNT = 10;
export const MAP_TILES_ROW_COUNT = 8;

export const TREES_CLEAR_COST = 200;
export const CRATERS_CLEAR_COST = 100;

export const STARTING_MONEY = 10000;
export const STARTING_HEALTH = 3;

export const WAVE_START_DELAY_MS = 5000;
export const WAVE_SPAWN_DELAY_MS = 1000;
export const ENEMY_EXTRA_HEALTH_PER_WAVE = 10;
export const ENEMY_BASE_HEALTH = 100;
export const ENEMY_BASE_SPEED = 75;
export const ENEMY_DAMAGE_TO_PLAYER = 1;
export const ENEMY_MONEY_VALUE = 100;

export const REMOVE_PRICE_MULTIPLIER = 0.8;
export const TURRET_BULLET_MK1_COST = 500;
export const TURRET_BULLET_MK2_COST = 600;
export const TURRET_BULLET_MK3_COST = 700;
export const TURRET_ENERGY_BALL_BLUE_MK1_COST = 800;
export const TURRET_ENERGY_BALL_BLUE_MK2_COST = 900;
export const TURRET_ENERGY_BALL_BLUE_MK3_COST = 1000;
export const TURRET_ENERGY_BALL_ORANGE_MK1_COST = 1100;
export const TURRET_ENERGY_BALL_ORANGE_MK2_COST = 1200;
export const TURRET_ENERGY_BALL_ORANGE_MK3_COST = 1300;
export const TURRET_LASER_MK1_COST = 1400;
export const TURRET_LASER_MK2_COST = 1500;
export const TURRET_LASER_MK3_COST = 1600;
export const TURRET_ROCKET_MK1_COST = 1700;
export const TURRET_ROCKET_MK2_COST = 1800;
export const TURRET_ROCKET_MK3_COST = 1900;

export const TURRET_BULLET_MK1_RANGE = 200;
export const TURRET_BULLET_MK2_RANGE = 230;
export const TURRET_BULLET_MK3_RANGE = 260;
export const TURRET_ENERGY_BALL_BLUE_MK1_RANGE = 200;
export const TURRET_ENERGY_BALL_BLUE_MK2_RANGE = 230;
export const TURRET_ENERGY_BALL_BLUE_MK3_RANGE = 260;
export const TURRET_ENERGY_BALL_ORANGE_MK1_RANGE = 200;
export const TURRET_ENERGY_BALL_ORANGE_MK2_RANGE = 230;
export const TURRET_ENERGY_BALL_ORANGE_MK3_RANGE = 260;
export const TURRET_LASER_MK1_RANGE = 200;
export const TURRET_LASER_MK2_RANGE = 230;
export const TURRET_LASER_MK3_RANGE = 260;
export const TURRET_ROCKET_MK1_RANGE = 200;
export const TURRET_ROCKET_MK2_RANGE = 230;
export const TURRET_ROCKET_MK3_RANGE = 260;

export const TURRET_BULLET_MK1_FIRERATE = 500;
export const TURRET_BULLET_MK2_FIRERATE = 450;
export const TURRET_BULLET_MK3_FIRERATE = 400;
export const TURRET_ENERGY_BALL_BLUE_MK1_FIRERATE = 1000;
export const TURRET_ENERGY_BALL_BLUE_MK2_FIRERATE = 950;
export const TURRET_ENERGY_BALL_BLUE_MK3_FIRERATE = 900;
export const TURRET_ENERGY_BALL_ORANGE_MK1_FIRERATE = 1000;
export const TURRET_ENERGY_BALL_ORANGE_MK2_FIRERATE = 950;
export const TURRET_ENERGY_BALL_ORANGE_MK3_FIRERATE = 900;
export const TURRET_LASER_MK1_FIRERATE = 1000;
export const TURRET_LASER_MK2_FIRERATE = 950;
export const TURRET_LASER_MK3_FIRERATE = 900;
export const TURRET_ROCKET_MK1_FIRERATE = 1000;
export const TURRET_ROCKET_MK2_FIRERATE = 950;
export const TURRET_ROCKET_MK3_FIRERATE = 900;

export const TURRET_BULLET_MK1_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_BULLET_MK2_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_BULLET_MK3_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_BLUE_MK1_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_BLUE_MK2_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_BLUE_MK3_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_ORANGE_MK1_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_ORANGE_MK2_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_ORANGE_MK3_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_LASER_MK1_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_LASER_MK2_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_LASER_MK3_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ROCKET_MK1_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ROCKET_MK2_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
export const TURRET_ROCKET_MK3_EFFECTS = [ new FlatDamageEffect(25), new FlatSlowEffect(1000, 25)];
