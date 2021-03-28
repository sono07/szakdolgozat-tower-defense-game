import { IEffect } from "../../../../api/effect/effect.interface";
import { IEnemy } from "../../../../api/object/enemy-object/enemy.interface";
import { IProjectile } from "../../../../api/object/projectile-object/projectile.interface";
import { PROJECTILE_Z_INDEX } from "../../../utils/constants";
import { convertOverlapParams } from "../../../utils/matter.physics.utils";
import { BaseObject } from "../../_abstract/base.object.abstract";

export abstract class BaseProjectile extends BaseObject implements IProjectile {
    protected isBodyAdded: boolean = true;
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
    }) {
        const { effects, targets, cb } = params;

        //reset body
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        //reset animation frame.
        this.setFrame('001');

        this.isRemoving = false;
        this.effects = effects;
        this.targets = targets;

        if(cb) cb();

        this.setActive(true);
        this.setVisible(true);
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
        )
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

    public remove(cb?: IProjectile['remove']) {
        this.setActive(false);
        this.setVisible(false);

        if (cb) cb();

        if (this.isBodyAdded) {
            this.isBodyAdded = false;
            this.scene.matter.world.remove(this.body);
        }

        this.isRemoving = false;
    }
}
