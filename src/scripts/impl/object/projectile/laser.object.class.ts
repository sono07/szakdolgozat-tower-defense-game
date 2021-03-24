import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { convertOverlapParams } from "../../utils/matter.physics.utils";
import { BaseObject } from "../_abstract/base.object.abstract";

export class LaserObject extends BaseObject {
    
    private isBodyAdded: boolean = true;
    private target!: IEnemy;
    private effects!: IEffect[];
    private hitAnim!: Phaser.GameObjects.Sprite;
    private isRemoving!: boolean;

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-laser');
        
        this.setRectangle(8, 32)
        this.setSensor(true);
        this.setDepth(10);

        this.hitAnim = this.scene.add.sprite(0, 0, 'projectile-energy-ball-blue', '001');
        this.hitAnim.setScale(0.7);
        this.hitAnim.setDepth(10);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, this.remove);
    }

    init(startPosition: Phaser.Math.Vector2, endPosition: Phaser.Math.Vector2, effects: IEffect[], target: IEnemy): void {
        //reset body
        if(!this.isBodyAdded) {
            this.isBodyAdded = true;
            this.scene.matter.world.add(this.body);
        }

        //reset animation frame.
        this.setFrame('001');

        this.isRemoving = false;
        this.target = target;
        this.effects = effects;

        this.setRotation(0)
        this.setScale(1, startPosition.distance(endPosition) / this.height);
        this.setRotation(Phaser.Math.Angle.BetweenPoints(startPosition, endPosition) - Math.PI / 2);
        this.position = startPosition.clone().lerp(endPosition.clone(), 0.5);

        this.setActive(true);
        this.setVisible(true);
    }

    update(time: number, delta: number): void {
        if(!this.isRemoving) {
            this.checkOverlapAndApplyEffects([this.target]);
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
            
            this.startRemove();
        }
    }

    private startRemove() {
        this.isRemoving = true;

        this.hitAnim.setActive(true);
        this.hitAnim.setVisible(true);
        this.hitAnim.setPosition(this.target.position.x, this.target.position.y);

        this.hitAnim.play({key: "projectile-energy-ball-blue-blow-animation", repeat: 0, frameRate: (7*7)})

        this.play({ key: "projectile-laser-blow-animation", repeat: 0, frameRate: (5*7) });
    }

    remove() {        
        this.setActive(false);
        this.setVisible(false);

        this.hitAnim.setActive(false);
        this.hitAnim.setVisible(false);
        
        if(this.isBodyAdded) {
            this.isBodyAdded = false;
            this.scene.matter.world.remove(this.body);
        }

        this.isRemoving = false;
    }
}
