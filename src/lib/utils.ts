import Chance from 'chance';

const chance = new Chance();

export function shuffle<T>(pool: T[]) {
  return chance.shuffle(pool);
}
