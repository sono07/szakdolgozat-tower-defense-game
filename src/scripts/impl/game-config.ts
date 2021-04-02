import { Phaser } from "../api/__helper__/phaser.export";
import { BootScene } from "./scene/boot.scene";
import { GameOverScene } from "./scene/game-over.scene";
import { GameScene } from "./scene/game.scene";
import { MainMenuScene } from "./scene/main-menu.scene";
import { PrealoadScene } from "./scene/preload.scene";
import { FlatFireEffect } from "./effect/active-effect/active-over-time-effect/flat-fire-effect.class";
import { FlatSlowEffect } from "./effect/active-effect/flat-slow-effect.class";
import { FlatDamageEffect } from "./effect/instant-effect/flat-damage-effect.class";
import { PercentageDamageEffect } from "./effect/instant-effect/percentage-damage-effect.class";

export const PhaserConfig: Phaser.Types.Core.GameConfig = {
    version: '1.0.0',
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    parent: 'phaser-canvas-container',
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: false,
            gravity: {
                y: 0,
                x: 0,
            },
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true,
    },
    scene: [BootScene, PrealoadScene, MainMenuScene, GameScene, GameOverScene]
};

export const MAP_TILES_COL_COUNT = 10;
export const MAP_TILES_ROW_COUNT = 8;

export const TREES_CLEAR_COST = 750;
export const CRATERS_CLEAR_COST = 500;

export const STARTING_MONEY = 2000;
export const STARTING_HEALTH = 300;

export const WAVE_START_DELAY_MS = 5000;
export const WAVE_SPAWN_DELAY_MS = 1000;
export const ENEMY_EXTRA_COUNT_PER_WAVE = 2;
export const ENEMY_EXTRA_HEALTH_PER_WAVE = 20;
export const ENEMY_BASE_HEALTH = 100;
export const ENEMY_BASE_SPEED = 75;
export const ENEMY_DAMAGE_TO_PLAYER = 100;
export const ENEMY_MONEY_VALUE = 100;

export const REMOVE_PRICE_MULTIPLIER = 0.6;
export const TURRET_BULLET_MK1_COST = 500;
export const TURRET_BULLET_MK2_COST = 1200;
export const TURRET_BULLET_MK3_COST = 3000;
export const TURRET_ENERGY_BALL_BLUE_MK1_COST = 800;
export const TURRET_ENERGY_BALL_BLUE_MK2_COST = 1600;
export const TURRET_ENERGY_BALL_BLUE_MK3_COST = 3200;
export const TURRET_ENERGY_BALL_ORANGE_MK1_COST = 800;
export const TURRET_ENERGY_BALL_ORANGE_MK2_COST = 1600;
export const TURRET_ENERGY_BALL_ORANGE_MK3_COST = 3200;
export const TURRET_LASER_MK1_COST = 700;
export const TURRET_LASER_MK2_COST = 1400;
export const TURRET_LASER_MK3_COST = 2800;
export const TURRET_ROCKET_MK1_COST = 1000;
export const TURRET_ROCKET_MK2_COST = 2500;
export const TURRET_ROCKET_MK3_COST = 4000;

export const TURRET_BULLET_MK1_RANGE = 220;
export const TURRET_BULLET_MK2_RANGE = 250;
export const TURRET_BULLET_MK3_RANGE = 280;
export const TURRET_ENERGY_BALL_BLUE_MK1_RANGE = 220;
export const TURRET_ENERGY_BALL_BLUE_MK2_RANGE = 250;
export const TURRET_ENERGY_BALL_BLUE_MK3_RANGE = 280;
export const TURRET_ENERGY_BALL_ORANGE_MK1_RANGE = 220;
export const TURRET_ENERGY_BALL_ORANGE_MK2_RANGE = 250;
export const TURRET_ENERGY_BALL_ORANGE_MK3_RANGE = 280;
export const TURRET_LASER_MK1_RANGE = 220;
export const TURRET_LASER_MK2_RANGE = 250;
export const TURRET_LASER_MK3_RANGE = 280;
export const TURRET_ROCKET_MK1_RANGE = 220;
export const TURRET_ROCKET_MK2_RANGE = 250;
export const TURRET_ROCKET_MK3_RANGE = 280;

export const TURRET_BULLET_MK1_FIRERATE = 500;
export const TURRET_BULLET_MK2_FIRERATE = 600;
export const TURRET_BULLET_MK3_FIRERATE = 700;
export const TURRET_ENERGY_BALL_BLUE_MK1_FIRERATE = 700;
export const TURRET_ENERGY_BALL_BLUE_MK2_FIRERATE = 700;
export const TURRET_ENERGY_BALL_BLUE_MK3_FIRERATE = 700;
export const TURRET_ENERGY_BALL_ORANGE_MK1_FIRERATE = 700;
export const TURRET_ENERGY_BALL_ORANGE_MK2_FIRERATE = 700;
export const TURRET_ENERGY_BALL_ORANGE_MK3_FIRERATE = 700;
export const TURRET_LASER_MK1_FIRERATE = 700;
export const TURRET_LASER_MK2_FIRERATE = 600;
export const TURRET_LASER_MK3_FIRERATE = 500;
export const TURRET_ROCKET_MK1_FIRERATE = 1000;
export const TURRET_ROCKET_MK2_FIRERATE = 950;
export const TURRET_ROCKET_MK3_FIRERATE = 900;

export const TURRET_BULLET_MK1_PROJECTILE_EFFECTS = [ new FlatDamageEffect(25)];
export const TURRET_BULLET_MK2_PROJECTILE_EFFECTS = [ new FlatDamageEffect(25)];
export const TURRET_BULLET_MK3_PROJECTILE_EFFECTS = [ new FlatDamageEffect(25)];
export const TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_BLUE_MK2_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new FlatSlowEffect(1000, 25)];
export const TURRET_ENERGY_BALL_ORANGE_MK1_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new FlatFireEffect(1000, 4, 15)];
export const TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new FlatFireEffect(1000, 4, 15)];
export const TURRET_ENERGY_BALL_ORANGE_MK3_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new FlatFireEffect(1000, 4, 15)];
export const TURRET_LASER_MK1_PROJECTILE_EFFECTS = [ new PercentageDamageEffect(0.20)];
export const TURRET_LASER_MK2_PROJECTILE_EFFECTS = [ new PercentageDamageEffect(0.20)];
export const TURRET_LASER_MK3_PROJECTILE_EFFECTS = [ new PercentageDamageEffect(0.20)];
export const TURRET_ROCKET_MK1_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new PercentageDamageEffect(0.10)];
export const TURRET_ROCKET_MK2_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new PercentageDamageEffect(0.10)];
export const TURRET_ROCKET_MK3_PROJECTILE_EFFECTS = [ new FlatDamageEffect(10), new PercentageDamageEffect(0.10)];

export const TURRET_BULLET_MK1_PROJECTILE_SPEED = 400;
export const TURRET_BULLET_MK2_PROJECTILE_SPEED = 400;
export const TURRET_BULLET_MK3_PROJECTILE_SPEED = 400;
export const TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_SPEED = 300;
export const TURRET_ENERGY_BALL_BLUE_MK2_PROJECTILE_SPEED = 300;
export const TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_SPEED = 300;
export const TURRET_ENERGY_BALL_ORANGE_MK1_PROJECTILE_SPEED = 300;
export const TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_SPEED = 300;
export const TURRET_ENERGY_BALL_ORANGE_MK3_PROJECTILE_SPEED = 300;
export const TURRET_ROCKET_MK1_PROJECTILE_SPEED = 100;
export const TURRET_ROCKET_MK2_PROJECTILE_SPEED = 150;
export const TURRET_ROCKET_MK3_PROJECTILE_SPEED = 200;

export const TURRET_BULLET_MK1_PROJECTILE_PENETRATION = 0;
export const TURRET_BULLET_MK2_PROJECTILE_PENETRATION = 0;
export const TURRET_BULLET_MK3_PROJECTILE_PENETRATION = 0;
export const TURRET_ENERGY_BALL_BLUE_MK1_PROJECTILE_PENETRATION = 0;
export const TURRET_ENERGY_BALL_BLUE_MK2_PROJECTILE_PENETRATION = 1;
export const TURRET_ENERGY_BALL_BLUE_MK3_PROJECTILE_PENETRATION = 2;
export const TURRET_ENERGY_BALL_ORANGE_MK1_PROJECTILE_PENETRATION = 0;
export const TURRET_ENERGY_BALL_ORANGE_MK2_PROJECTILE_PENETRATION = 1;
export const TURRET_ENERGY_BALL_ORANGE_MK3_PROJECTILE_PENETRATION = 2;

export const TURRET_ROCKET_MK1_PROJECTILE_BLOW_RADIUS = 50;
export const TURRET_ROCKET_MK2_PROJECTILE_BLOW_RADIUS = 75;
export const TURRET_ROCKET_MK3_PROJECTILE_BLOW_RADIUS = 100;
