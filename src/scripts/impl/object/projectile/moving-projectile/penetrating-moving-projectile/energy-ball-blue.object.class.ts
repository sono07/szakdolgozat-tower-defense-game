import { Phaser } from '../../../../../api/__helper__/phaser.export';
import { BasePenetratingMovingProjectile } from "./__abstract__/base-penetrating-moving-projectile.abstract";

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
