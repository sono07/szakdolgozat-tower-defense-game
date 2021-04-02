import { Phaser } from '../../../api/__helper__/phaser.export';
import { IEffect } from "../../../api/effect/effect.interface";
import { IEnemy } from "../../../api/object/enemy-object/enemy.interface";
import { PROJECTILE_Z_INDEX } from "../../game-constants";
import { BaseProjectile } from "./__abstract__/base-projectile.abstract";

export class LaserObject extends BaseProjectile {
    private hitAnim!: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-laser', undefined, (self) => {
            self.setRectangle(8, 32)
        });
        
        this.hitAnim = this.scene.add.sprite(0, 0, 'projectile-energy-ball-blue', '001');
        this.hitAnim.setScale(0.7);
        this.hitAnim.setDepth(PROJECTILE_Z_INDEX);
    }

    public init(params: {
        startPosition: Phaser.Math.Vector2,
        endPosition: Phaser.Math.Vector2,
        effects: IEffect[],
        targets: IEnemy[],
        cb?: () => void,
    }): void {
        const {startPosition, endPosition, cb} = params;

        super.init({
            ...params,
            cb: () => {
                this.setRotation(0)
                this.setScale(1, startPosition.distance(endPosition) / this.height);
                this.setRotation(Phaser.Math.Angle.BetweenPoints(startPosition, endPosition) - Math.PI / 2);
                this.position = startPosition.clone().lerp(endPosition.clone(), 0.5);

                if(cb) cb();
            },
        })
    }

    public update(time: number, delta: number): void {
        super.update(time, delta, (time, delta) => {
            this.checkOverlapAndApplyEffects(this.targets);
        })
    }

    protected applyEffects(enemy: IEnemy): void {
        super.applyEffects(enemy, (enemy) => {
            this.startRemove();
        })
    }

    protected startRemove() {
        super.startRemove(() => {
            this.hitAnim.setActive(true);
            this.hitAnim.setVisible(true);
            this.hitAnim.setPosition(this.targets[0].position.x, this.targets[0].position.y);
    
            this.hitAnim.play({key: "projectile-energy-ball-blue-blow-animation", repeat: 0, frameRate: (7*7)})
    
            this.play({ key: "projectile-laser-blow-animation", repeat: 0, frameRate: (5*7) });
        })
    }

    public remove() {
        super.remove(() => {
            this.hitAnim.setActive(false);
            this.hitAnim.setVisible(false);
        })      
    }
}
