import { Phaser } from '../../../api/__helper__/phaser.export';
import { RocketObject } from "../../object/projectile/moving-projectile/rocket.object.class";
import { BaseGroup } from "../_abstract/base.group.abstract";

export class RocketGroup extends BaseGroup<RocketObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, RocketObject);
    }
}
