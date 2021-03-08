import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { BaseObject } from "./_abstract/base.object.abstract";

export class EnemyObject extends BaseObject implements IEnemy {
    id!: number;
    health!: number;
    speed!: number;
    path!: Phaser.Curves.Path;
    private pathT!: number;

    constructor(scene: Phaser.Scene) {
        super(scene, "sprites", "enemy")
    }
    
    create(healt: number, speed: number, path: Phaser.Curves.Path) {
        this.health = healt;
        this.speed = speed;
        this.path = path;
        this.pathT = 0;

        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);
        super._create(vector);
    }

    receiveDamage(damage: number) {
        this.health -= damage;           
            
        // if hp drops below 0 we deactivate this enemy
        if(this.health <= 0) {
            this.destroy();    
        }
    }

    update(time: number, delta: number): void {
        const speed = this.speed < 0 ? 0 : Phaser.Math.GetSpeed(this.speed/this.path.getLength(), 1);
        this.pathT += speed * delta;
        
        let vector = new Phaser.Math.Vector2();
        this.path.getPoint(this.pathT, vector);
        this.position = vector;

        if (this.pathT >= 1) {
            this.destroy();
        }
    }

    destroy() {
        super._destroy();
    }

}