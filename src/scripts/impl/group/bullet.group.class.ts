import { BulletObject } from "../object/bullet.object.class";
import { BaseGroup } from "./_abstract/base.group.abstract";

export class BulletGroup extends BaseGroup<BulletObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, BulletObject);
        this.runChildUpdate = true;
    }
}
