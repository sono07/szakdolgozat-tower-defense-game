import { BulletObject } from "../../object/projectile/bullet.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class BulletGroup extends BaseGroup<BulletObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, BulletObject);
    }
}
