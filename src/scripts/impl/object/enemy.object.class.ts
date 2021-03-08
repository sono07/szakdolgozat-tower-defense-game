import { IEffect } from "../../api/effect/effect.interface";
import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { BaseObject } from "./_abstract/base.object.abstract";

export class EnemyObject extends BaseObject implements IEnemy {
    id!: number;
    health!: number;
    speed!: number;
    effects!: IEffect[];
    path!: Phaser.Curves.Path;
    private pathT!: number;
    private debugCircle!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprites", "enemy")
    }
    
    create(healt: number, speed: number, path: Phaser.Curves.Path) {
        this.health = healt;
        this.speed = speed;
        this.effects = [];
        this.path = path;
        this.pathT = 0;

        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);
        super._create(vector);

        if(this.scene.physics.world.drawDebug) {
            this.debugCircle = this.scene.add.circle(this.position.x, this.position.y, 1, 0x00FF00, 1)
        }
    }

    update(time: number, delta: number): void {
        const speed = this.speed < 0 ? 0 : Phaser.Math.GetSpeed(this.speed/this.path.getLength(), 1);
        this.pathT += speed * delta;
        
        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);
        this.position = vector;

        if(this.debugCircle != null) {
            this.debugCircle.setPosition(this.position.x, this.position.y);
        }

        for(const effect of this.effects) {
            effect.update(time, delta, this);
        }
        this.effects = this.effects.filter(effect => !effect.isDestroyed);

        if (this.pathT >= 1 || this.health <= 0) {
            this.destroy();
        }
    }

    destroy() {
        if(this.debugCircle != null) {
            this.debugCircle.destroy();
        }

        super._destroy();
    }

}
