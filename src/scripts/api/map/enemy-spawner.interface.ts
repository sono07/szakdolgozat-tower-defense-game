export interface IEnemySpawner {
    waveNumberChangedCallback: ((waveNumber: number) => void)[];
    waveEnemyNumberChangedCallback: ((enemyNumber: number) => void)[];

    getWaveNumber(): number;
    getWaveEnemyNumber(): number;
    update(time: number, delta: number): void;
}