import { EnemyObject } from "../object/enemy.object.class";
import { BaseGroup } from "./_abstract/base.group.abstract";

export class EnemyGroup extends BaseGroup<EnemyObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, EnemyObject);
    }
}
