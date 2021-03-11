import { PenetratingBulletObject } from "../object/projectile/penetrating-bullet.object.class";
import { BaseGroup } from "./_abstract/base.group.abstract";

export class BulletGroup extends BaseGroup<PenetratingBulletObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, PenetratingBulletObject);
    }
}
