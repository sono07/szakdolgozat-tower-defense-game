import { IEnemy } from "../object/enemy-object/enemy.interface";

export interface IEffect {
    // readonly discriminator: "EFFECT";
    readonly isDestroyed: boolean;
    update(time: number, delta: number, enemy: IEnemy): void;
}
