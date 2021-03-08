import { IObject } from "../object.interface";

export interface IEnemy extends IObject {
    // readonly discriminator: "ENEMY";
    health: number;
    speed: number;
    path: Phaser.Curves.Path;
    // damage: number;

    receiveDamage(damage: number): void;
    create(health: number, speed: number, path: Phaser.Curves.Path): void;
}
