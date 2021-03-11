// import { IEffect } from "../../../../api/effect/effect.interface";
// import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
// import { IProjectile } from "../../../../api/object/projectile-object/projectile.interface";
import { BaseObject } from "../../_abstract/base.object.abstract";

export abstract class BaseProjectile extends BaseObject /*implements IProjectile*/ {
//     protected effects!: IEffect[]; //contains damage effects also if any, clone these and add to the enemies got hit
//     protected movingTo!: Phaser.Math.Vector2 | IEnemy;

    constructor(scene: Phaser.Scene, texture: string, frame?: string) {
        super(scene, texture, frame);
        this.setDepth(5);
    }

//     protected getPositionOf(object: Phaser.Math.Vector2 | IEnemy): Phaser.Math.Vector2 {
//         if(object instanceof Phaser.Math.Vector2) {
//             return object;
//         } else {
//             return object.position;
//         }
//     }

//     create(movingFrom: Phaser.Math.Vector2 | IEnemy, movingTo: IEnemy | Phaser.Math.Vector2, effects: IEffect[], ...args: any[]) {
//         super.create(this.getPositionOf(movingFrom));
        
//         this.movingTo = movingTo;
//         this.effects = effects;
//     }

//     abstract update(time: number, delta: number): void;

//     destroy() {
//         super.destroy();
//     }
}