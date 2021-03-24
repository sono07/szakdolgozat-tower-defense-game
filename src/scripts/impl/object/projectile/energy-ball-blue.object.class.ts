import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { IObject } from "../../../api/object/object.interface";
import { IProjectile } from "../../../api/object/projectile-object/projectile.interface";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseObject } from "../_abstract/base.object.abstract";

export class EnergyBallBlueObject extends BaseObject implements IObject, IProjectile {
    private isBodyAdded: boolean = true;
    private startPosition!: Phaser.Math.Vector2;
    private speed!: number;
    private dPosition!: Phaser.Math.Vector2;
    private maxDistance!: number;
    private targets!: IEnemy[];
    private hitCount!: number;
    private enemiesAlreadyGotHit!: IEnemy[];
    private effects!: IEffect[];
    private isRemoving!: boolean; 

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-energy-ball-blue');

        this.setCircle(1);
        this.setSensor(true);
        this.setDepth(10);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.remove);
    }

    init(startPosition: Phaser.Math.Vector2, endPosition: Phaser.Math.Vector2, speed: number, effects: IEffect[], targets: IEnemy[], penetrationCount: number): void {
        //reset body
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        //reset animation frame.
        this.setFrame('001');

        this.isRemoving = false;
        this.startPosition = startPosition.clone();
        this.position = startPosition.clone();
        this.speed = speed;
        this.dPosition = endPosition.clone().subtract(startPosition.clone()).normalize().scale(Phaser.Math.GetSpeed(this.speed, 1));
        this.maxDistance = startPosition.clone().distance(endPosition.clone());
        this.targets = targets;
        this.hitCount = penetrationCount + 1;
        this.enemiesAlreadyGotHit = [];
        this.effects = effects;

        this.setActive(true);
        this.setVisible(true);
    }

    update(time: number, delta: number): void {
        if(!this.isRemoving) {
            this.position = this.position.add(this.dPosition.clone().scale(delta));

            this.checkOverlapAndApplyEffects(this.targets);

            if (this.position.distance(this.startPosition) >= this.maxDistance) {
                this.startRemove();
            }
        }
    }

    private checkOverlapAndApplyEffects(targets: IEnemy[]): void {
        this.scene.matter.overlap(
            this,
            targets as any[],
            (obj1: any, obj2: any) => this.applyEffects(convertOverlapParams(obj1, obj2)[1]),
        )
    }

    private applyEffects(enemy: IEnemy): void {
        if(enemy.active === true && this.isRemoving == false) {
            this.effects.forEach(effect => {
                enemy.addEffect(effect.clone());
            });
            
            this.enemiesAlreadyGotHit.push(enemy);
            if(this.enemiesAlreadyGotHit.length >= this.hitCount) {
                this.startRemove();
            }
        }
    }

    private startRemove() {
        this.isRemoving = true;
        this.play({ key: "projectile-energy-ball-blue-blow-animation", repeat: 0, frameRate: (7*5) });
    }

    remove() {        
        this.setActive(false);
        this.setVisible(false);
        
        if(this.isBodyAdded) {
            this.isBodyAdded = false;
            this.scene.matter.world.remove(this.body);
        }

        this.isRemoving = false;
    }
}
