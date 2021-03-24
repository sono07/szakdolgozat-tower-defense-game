import { EnemyWithDistance } from "../../../../api/common/types";
import { ITurretObject } from "../../../../api/object/turret-object/turret-object.interface";
import { GameStateStore } from "../../../game-state/game-state.store.class";
import { BaseObject } from "../../_abstract/base.object.abstract";

export abstract class BaseTurretObject extends BaseObject implements ITurretObject {
    public ignoreUpdate: boolean = false;

    abstract init(position: Phaser.Math.Vector2, gameStateStore: GameStateStore, ignoreUpdate?: boolean): void;
    abstract remove(): void;
    abstract showRange(): void;
    abstract hideRange(): void;
}

export const EnemySorters = {
    enemySorterClosestToTheEnd(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.pathT > b.pathT) {
            return -1;
        } else if(a.pathT == b.pathT) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterFurthestToTheEnd(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.pathT < b.pathT) {
            return -1;
        } else if(a.pathT == b.pathT) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterClosest(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a._d < b._d) {
            return -1;
        } else if(a._d == b._d) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterFurthest(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a._d < b._d) {
            return 1;
        } else if(a._d == b._d) {
            return 0;
        } else {
            return -1;
        }
    },

    enemySorterLowestHp(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.health < b.health) {
            return -1;
        } else if(a.health == b.health) {
            return 0;
        } else {
            return 1;
        }
    },

    enemySorterHighestHp(a: EnemyWithDistance, b: EnemyWithDistance) {
        if(a.health > b.health) {
            return -1;
        } else if(a.health == b.health) {
            return 0;
        } else {
            return 1;
        }
    },
} 