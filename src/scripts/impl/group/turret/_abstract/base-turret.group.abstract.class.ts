import { ITurretGroup } from "../../../../api/group/turret-group/turret-group.interface";
import { ITurretObject } from "../../../../api/object/turret-object/turret-object.interface";
import { BaseGroup } from "../../_abstract/base.group.abstract";

export abstract class BaseTurretGroup<T extends Phaser.GameObjects.GameObject & ITurretObject> extends BaseGroup<T> implements ITurretGroup<T> {
    abstract getPrice(): number;
    abstract getTile(): number;
}