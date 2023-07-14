import albums from './data.json';

export type Album = (typeof albums)[number];

export function getAlbums(): Album[] {
  return albums.sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );
}
