import { Phaser } from '../../../../../api/__helper__/phaser.export';
import { BasePenetratingMovingProjectile } from "./_abstract/base-penetrating-moving-projectile.abstract";

export class EnergyBallOrangeObject extends BasePenetratingMovingProjectile {

    constructor(scene: Phaser.Scene) {
        super(scene, 'projectile-energy-ball-orange', undefined, (self) => {
            self.setCircle(1);
        });
    }

    protected startRemove() {
        super.startRemove(() => {
            this.play({ key: "projectile-energy-ball-orange-blow-animation", repeat: 0, frameRate: (7*5) });
        });
    }
}
