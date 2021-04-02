import { ROTATION_180, ROTATION_270, ROTATION_90, ROTATION_ZERO, TILE_CRATERS, TILE_EMPTY, TILE_ROAD_2WAY_CORNER, TILE_ROAD_2WAY_STRAIGHT, TILE_ROAD_3WAY, TILE_ROAD_4WAY, TILE_TREES } from "../../impl/game-constants";
import { MapGenerator } from '../../impl/map/map-generator.class';
import { Tuple } from '../../api/common/types';

test('Test seed same generated map', () => {
  const seed = "asdsa";

  const generated1 = MapGenerator.generateMap(seed, 10, 10);
  const generated2 = MapGenerator.generateMap(seed, 10, 10);

  expect(generated2).toStrictEqual(generated1);
})

test('Test seed different generated map', () => {
  const seed1 = "asdsa";
  const seed2 = "asdsa2";

  const generated1 = MapGenerator.generateMap(seed1, 10, 10);
  const generated2 = MapGenerator.generateMap(seed2, 10, 10);

  expect(generated2).not.toStrictEqual(generated1);
})

test('Test proper dimensions', () => {
  const seed = "asdsa";
  const width = 8;
  const height = 10;

  const generated = MapGenerator.generateMap(seed, height, width);

  expect(generated.map.length).toStrictEqual(height);
  for(let mapRow of generated.map) {
    expect(mapRow.length).toStrictEqual(width);
  }
})

test('Test proper map values', () => {
  const seed = "asdsa";
  const width = 8;
  const height = 10;

  const generated = MapGenerator.generateMap(seed, height, width);

  for(let mapRow of generated.map) {
    for(let cell of mapRow) {
      const whole = Math.floor(cell);
      const remainder = cell - whole;

      expect(
        whole == TILE_EMPTY ||
        whole == TILE_CRATERS ||
        whole == TILE_TREES ||
        whole == TILE_ROAD_2WAY_STRAIGHT ||
        whole == TILE_ROAD_2WAY_CORNER ||
        whole == TILE_ROAD_3WAY ||
        whole == TILE_ROAD_4WAY
      ).toStrictEqual(true);

      expect(
        remainder == ROTATION_ZERO ||
        remainder == ROTATION_90 ||
        remainder == ROTATION_180 ||
        remainder == ROTATION_270
      ).toStrictEqual(true);
    }
  }
})



test('Test proper path start & end', () => {
  const seed = "asdsa";
  const width = 8;
  const height = 10;

  const generated = MapGenerator.generateMap(seed, height, width);
  expect(generated.path.length).toBeGreaterThanOrEqual(2);
  expect(generated.path[0]).toStrictEqual([0,0]);
  expect(generated.path[generated.path.length - 1]).toStrictEqual([width-1,height-1]);
})

test('Test proper path values', () => {
  const seed = "asdsa";
  const width = 8;
  const height = 10;

  const generated = MapGenerator.generateMap(seed, height, width);

  for(let pathPoint of generated.path) {
    expect(pathPoint[0]).toBeGreaterThanOrEqual(0)
    expect(pathPoint[0]).toBeLessThanOrEqual(width-1)

    expect(pathPoint[1]).toBeLessThanOrEqual(height-1)
    expect(pathPoint[1]).toBeGreaterThanOrEqual(0)
  }
})

test('Test path no crossings', () => {
  const seed = "asdsa";
  const width = 8;
  const height = 10;

  const generated = MapGenerator.generateMap(seed, height, width);
  const withoutDuplicates: Tuple<number, 2>[] = [];

  generated.path.forEach((v) => {
    if(!withoutDuplicates.some(d => (d[0] == v[0] && d[1] == v[1]))) {
      withoutDuplicates.push(v);
    }
  });
  expect(withoutDuplicates.length).toStrictEqual(generated.path.length);
})

test('Test path connected', () => {
  const seed = "asdsa";
  const width = 8;
  const height = 10;

  const generated = MapGenerator.generateMap(seed, height, width);
  let previous = generated.path[0];

  for (let i = 1; i < generated.path.length; i++) {
    const p = generated.path[i];

    const dpos = [p[0]-previous[0], p[1]-previous[1]];
    const d = Math.sqrt(dpos[0]*dpos[0] + dpos[1]*dpos[1])
    expect(d).toStrictEqual(1);

    previous = p;
  }
})
