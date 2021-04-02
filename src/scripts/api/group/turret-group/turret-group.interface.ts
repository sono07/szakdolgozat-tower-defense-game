import { Phaser } from "../../__helper__/phaser.export";
import { ITurretObject } from "../../object/turret-object/turret-object.interface";
import { IGroup } from "../group.interface";

export interface ITurretGroup<T extends Phaser.GameObjects.GameObject & ITurretObject> extends IGroup<T> {
    getPrice(): number;
    getTile(): number;
}
            