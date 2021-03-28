import { BasePenetratingMovingProjectile } from "./_abstract/base-penetrating-moving-projectile.abstract";

export class EnergyBallBlueObject extends BasePenetratingMovingProjectile {

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-energy-ball-blue', undefined, (self) => {
            self.setCircle(1);
        });
    }

    protected startRemove() {
        super.startRemove(() => {
            this.play({ key: "projectile-energy-ball-blue-blow-animation", repeat: 0, frameRate: (7*5) });
        });
    }
}
