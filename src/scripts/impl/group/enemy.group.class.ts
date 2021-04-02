import { Phaser } from '../../api/__helper__/phaser.export';
import { EnemyObject } from "../object/enemy/enemy.object.class";
import { BaseGroup } from "./__abstract__/base.group.abstract";

export class EnemyGroup extends BaseGroup<EnemyObject> {

    constructor(scene: Phaser.Scene) {
        super(scene, EnemyObject);
    }
}
