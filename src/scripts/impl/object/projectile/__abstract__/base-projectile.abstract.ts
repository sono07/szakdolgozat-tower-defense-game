import { Phaser } from '../../../../api/__helper__/phaser.export';
import { IEffect } from "../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { IProjectile } from "../../../../api/object/projectile-object/projectile.interface";
import { PROJECTILE_Z_INDEX } from "../../../game-constants";
import { convertOverlapParams } from "../../../utils/matter.physics.utils";
import { BaseObject } from "../../__abstract__/base.object.abstract";

export abstract class BaseProjectile extends BaseObject implements IProjectile {
    protected isRemoving: boolean = false;
    protected effects!: IEffect[];
    protected targets!: IEnemy[];

    constructor(scene: Phaser.Scene, texture: string, frame?: string, cb?: (self: BaseObject) => void) {
        super(scene, texture, frame, cb);

        this.setSensor(true);
        this.setDepth(PROJECTILE_Z_INDEX);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {this.remove()});
    }

    public init(params: {
        effects: IEffect[],
        targets: IEnemy[],
        cb?: () => void,
    }): void {
        const { effects, targets, cb } = params;

        super.init({
            ...params,
            cb: () => {
                //reset animation frame.
                this.setFrame('001');

                this.isRemoving = false;
                this.effects = effects;
                this.targets = targets;

                if(cb) cb();
            }
        })
    }

    public update(time: number, delta: number, cb?: (time: number, delta: number) => void): void {
        if(!this.isRemoving) {
            if(cb) cb(time, delta);
        }
    }

    protected checkOverlapAndApplyEffects(targets: IEnemy[]): void {
        this.scene.matter.overlap(
            this,
            targets as any[],
            (obj1: any, obj2: any) => this.applyEffects(convertOverlapParams(obj1, obj2)[1]),
            (obj1: any, obj2: any) => this.shouldApplyEffects(convertOverlapParams(obj1, obj2)[1]),
        )
    }

    protected shouldApplyEffects(enemy: IEnemy): boolean {
        return true;
    }

    protected applyEffects(enemy: IEnemy, cb?: (enemy: IEnemy) => void): void {
        if(enemy.active === true && this.isRemoving == false) {
            this.effects.forEach(effect => {
                enemy.addEffect(effect.clone());
            });

            if(cb) cb(enemy);
        }
    }

    protected startRemove(cb?: () => void) {
        this.isRemoving = true;

        if (cb) cb();
    }

    public remove(cb?: (() => void)) {
        super.remove(cb);

        this.isRemoving = false;
    }
}
