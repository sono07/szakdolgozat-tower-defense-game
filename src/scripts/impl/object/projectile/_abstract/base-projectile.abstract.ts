import { IEffect } from "../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { convertOverlapParams } from "../../../utils/matter.physics.utils";
import { BaseObject } from "../../_abstract/_base.object.abstract";

export abstract class BaseProjectile extends BaseObject /*implements IProjectile*/ {
//     protected movingTo!: Phaser.Math.Vector2 | IEnemy;
    protected effects!: IEffect[];
    protected visibleAfterRemoveMs!: number;
    protected isRemoving!: boolean;

    constructor(scene: Phaser.Scene, texture: string, frame?: string, options?: Phaser.Types.Physics.Matter.MatterBodyConfig) {
        super(scene, texture, frame, {...options});
        this.setDepth(5);
    }

    protected abstract _init(...args: any): [position: Phaser.Math.Vector2, effects: IEffect[], visibleAfterRemoveMs: number, ...args: any[]];

    protected _afterInit(position: Phaser.Math.Vector2, effects: IEffect[], visibleAfterRemoveMs: number, ...args: any[]): void {
        this.effects = effects;
        this.isRemoving = false;
        this.visibleAfterRemoveMs = visibleAfterRemoveMs;

        super._afterInit(position);
    }

    protected checkOverlapAndApplyEffects(targets: IEnemy[]): void {
        this.scene.matter.overlap(
            this,
            targets as any[],
            (obj1: any, obj2: any) => this.applyEffects(convertOverlapParams(obj1, obj2)[1]),
            (obj1: any, obj2: any) => this.shouldApplyEffects(convertOverlapParams(obj1, obj2)[1]),
        )
    }

    protected applyEffects(enemy: IEnemy): void {
        if(enemy.active === true && this.active === true && !this.isRemoving) {
            this.effects.forEach(effect => {
                enemy.addEffect(effect.clone());
            })

            this.afterEffectsApplied(enemy);
        }
    }

    protected afterEffectsApplied(enemy: IEnemy): void {
        //do nothing
    }

    /**
     * Override this method to filter enemies to hit
     * @param bullet
     * @param enemy 
     */
    protected shouldApplyEffects(enemy: IEnemy): boolean {
        return true;
    }

    protected processRemoving(delta: number): void {
        this.visibleAfterRemoveMs -= delta;
        if(this.visibleAfterRemoveMs <= 0) {
            this.remove();
        }
    }

    protected initRemoving() {
        this.isRemoving = true;
    }

    protected _remove() {
    }
}