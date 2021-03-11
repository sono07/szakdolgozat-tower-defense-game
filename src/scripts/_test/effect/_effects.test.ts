import { IEffect } from "../../api/effect/effect.interface";
import { IEnemy } from "../../api/object/enemy-object/enemy.interface";
import { FlatFireEffect } from "../../impl/effect/active-effect/active-over-time-effect/flat-fire-effect.class";
import { PercentageFireEffect } from "../../impl/effect/active-effect/active-over-time-effect/percentage-fire-effect.class";
import { FlatSlowEffect } from "../../impl/effect/active-effect/flat-slow-effect.class";
import { PercentageSlowEffect } from "../../impl/effect/active-effect/percentage-slow-effect.class";
import { FlatDamageEffect } from "../../impl/effect/instant-effect/flat-damage-effect.class";
import { PercentageDamageEffect } from "../../impl/effect/instant-effect/percentage-damage-effect.class";

//TODO write more test

type EffectConstructorType = new(...params: any[]) => IEffect;

test('Test cloning', () => {
    testClones(FlatDamageEffect, [100]);
    testClones(FlatDamageEffect, [500]);
    testClones(PercentageDamageEffect, [0.1]);
    testClones(PercentageDamageEffect, [0.1]);
    testClones(PercentageSlowEffect, [600, 0.10]);
    testClones(FlatSlowEffect, [1000, 50]);
    testClones(FlatSlowEffect, [1100, 30]);
    testClones(PercentageSlowEffect, [600, 0.10]);
    testClones(PercentageSlowEffect, [1300, 0.10]);
    testClones(FlatFireEffect, [1000, 5, 10]);
    testClones(FlatFireEffect, [400, 4, 10]);
    testClones(PercentageFireEffect, [1000, 5, 0.10]);
    testClones(PercentageFireEffect, [500, 5, 0.10]);
})

function testClones<T extends EffectConstructorType>(classConstructor: T, params: ConstructorParameters<T>) {
  const a = new classConstructor(...params);
  const b = a.clone();

  expect(a).toBeInstanceOf(classConstructor);
  expect(b).toBeInstanceOf(classConstructor);
  expect(a == b).toBeFalsy()
}

test('Test FlatDamageEffect with 233', () => {
  const enemy: Partial<IEnemy> = {
    health: 1000,
    speed: 100,
  };

  const effects: IEffect[] = [
    new FlatDamageEffect(233),
  ]

  const expectedResults: Partial<IEnemy>[] = [
    {//0 ms
      health: 1000,
      speed: 100,
    },
    {//200ms
      health: 767,
      speed: 100,
    },
  ];

  testEffects(enemy, effects, expectedResults);
})

test('Complex multi effect test', () => {
  const enemy: Partial<IEnemy> = {
    health: 1000,
    speed: 100,
  };

  const effects: IEffect[] = [
    new FlatDamageEffect(100),
    new FlatDamageEffect(500),
    new PercentageDamageEffect(0.1),
    new PercentageDamageEffect(0.1),
    new PercentageSlowEffect(600, 0.10),
    new FlatSlowEffect(1000, 50),
    new FlatSlowEffect(1100, 30),
    new PercentageSlowEffect(600, 0.10),
    new PercentageSlowEffect(1300, 0.10),
    new FlatFireEffect(1000, 5, 10),
    new FlatFireEffect(400, 4, 10),
    new PercentageFireEffect(1000, 5, 0.10),
    new PercentageFireEffect(500, 5, 0.10),
  ]

  const expectedResults: Partial<IEnemy>[] = [
    {//0 ms
      health: 1000,
      speed: 100,
    },
    {//200ms
      health: 214.32600000000002,
      speed: 8.1,
    },
    {//400ms
      health: 134.37365400000002,
      speed: 8.1,
    },
    {//600ms
      health: 100.74265974000001,
      speed: 19.1,
    },
    {//800ms
      health: 81.66839376600001,
      speed: 19.1,
    },
    {//1000ms
      health: 64.50155438940001,
      speed: 69.1,
    },
    {//1200ms
      health: 64.50155438940001,
      speed: 99.1,
    },
    {//1400ms
      health: 64.50155438940001,
      speed: 100,
    },
  ];

  testEffects(enemy, effects, expectedResults);
});

function testEffects(_enemy: Partial<IEnemy>, effects: IEffect[], _expectedResults: Partial<IEnemy>[]) {
  const enemy: IEnemy = {
    // position: Point2dUtils.createPoint2d({x: 0, y: 0}),
    health: 1000,
    speed: 100,
    // damage: 100,
    // effects: [],
    // update: () => {},
    ..._enemy
  } as IEnemy;

  const expectedResults: IEnemy[] = _expectedResults.map(er => ({...enemy, ...er}))

  function update(time: number, delta: number) {
    for (const effect of effects) {
      effect.update(time, delta, enemy);
    }

    effects = effects.filter(effect => !effect.isDestroyed);
  }

  function testResult(i: number) {
    const expected = expectedResults[i];

    expect(enemy.health).toBe(expected.health);
    expect(enemy.speed).toBe(expected.speed);
  }

  let i = 0;
  testResult(i);
  let total = 0;

  const interval = setInterval(() => {
    let delta = 200;
    total += 200;
    update(total, delta);

    if (++i >= expectedResults.length) {
      clearInterval(interval);
    } else {
      testResult(i)
    }
  }, 1)
}

