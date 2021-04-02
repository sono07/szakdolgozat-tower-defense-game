import { EnemySpawner } from '../../impl/map/enemy-spawner.class';

test('Test construct', () => {
  //TODO test construct
})

test('Test update new wave number', () => {
  const spawner = new EnemySpawner();

  expect(spawner.getWaveNumber()).toStrictEqual(0)

  spawner.update(2000, 2000);
  expect(spawner.getWaveNumber()).toStrictEqual(1);
  //TODO kill all
  spawner.update(2000, 2000);
  expect(spawner.getWaveNumber()).toStrictEqual(2);
})

test('Test update new wave enemy number', () => {
  const spawner = new EnemySpawner();

  expect(spawner.getWaveEnemyNumber()).toStrictEqual(0)

  spawner.update(2000, 2000);
  expect(spawner.getWaveEnemyNumber()).toStrictEqual(2);
  //TODO kill all
  spawner.update(2000, 2000);
  expect(spawner.getWaveEnemyNumber()).toStrictEqual(4);
})

test('Test enemy health increase', () => {
  //TODO test enemy health increase
})

test('Test enemy proper path passed', () => {
  //TODO test enemy path
})

test('Test enemy spawn delay', () => {
  //TODO test enemy spawn delay
})

test('Test wave start delay', () => {
  //TODO test wave start delay
})

test('Test waveNumberChangedCallback called', () => {
  //TODO waveNumberChangedCallback called
})

test('Test waveEnemyNumberChangedCallback called', () => {
  //TODO test waveEnemyNumberChangedCallback called
})


