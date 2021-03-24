import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseObject } from "../_abstract/base.object.abstract";

export class RocketObject extends BaseObject {
    private isBodyAdded: boolean = true;
    private startPosition!: Phaser.Math.Vector2;
    private speed!: number;
    private dPosition!: Phaser.Math.Vector2;
    private maxDistance!: number;
    private targets!: IEnemy[];
    private effects!: IEffect[];
    private radius!: number;
    private isRemoving!: boolean; 

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-rocket');

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.remove);
    }

    init(startPosition: Phaser.Math.Vector2, endPosition: Phaser.Math.Vector2, speed: number, effects: IEffect[], targets: IEnemy[], radius: number) {
        //reset body
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        //reset animation frame.
        this.setFrame('001');

        this.setScale(200/256,200/256);
        this.setCircle(radius);
        this.setSensor(true);
        this.setDepth(10);
        this.setRotation(Phaser.Math.Angle.BetweenPoints(startPosition, endPosition) + Math.PI / 2);

        this.isRemoving = false;
        this.startPosition = startPosition.clone();
        this.position = startPosition.clone();
        this.speed = speed;
        this.dPosition = endPosition.clone().subtract(startPosition.clone()).normalize().scale(Phaser.Math.GetSpeed(this.speed, 1));
        this.maxDistance = startPosition.clone().distance(endPosition.clone());
        this.targets = targets;
        this.effects = effects;
        this.radius = radius;

        this.setActive(true);
        this.setVisible(true);
    }

    update(time: number, delta: number): void {
        if(!this.isRemoving) {
            this.position = this.position.add(this.dPosition.clone().scale(delta));

            if (this.position.distance(this.startPosition) >= this.maxDistance) {
                this.checkOverlapAndApplyEffects(this.targets);
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
        }
    }

    private startRemove() {
        this.isRemoving = true;

        this.setFrame('002');
        this.setScale(this.radius*4/this.displayHeight)
        this.play({ key: "projectile-rocket-blow-animation", repeat: 0, frameRate: (49/2) });
        this.setRotation(0);
        this.position = this.position.clone().add(new Phaser.Math.Vector2(-8, 10).scale(this.radius*4/100))
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
