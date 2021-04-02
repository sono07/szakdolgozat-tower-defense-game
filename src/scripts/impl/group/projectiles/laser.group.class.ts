import { Phaser } from '../../../api/__helper__/phaser.export';
import { LaserObject } from "../../object/projectile/laser.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class LaserGroup extends BaseGroup<LaserObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, LaserObject);
    }
}
