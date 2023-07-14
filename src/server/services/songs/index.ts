import { getAlbums, type Album } from '../albums';
import songs from './data.json';

export type Song = Omit<(typeof songs)[number], 'album'> & {
  album: Album;
};

export function getSongs(): Song[]  {
  const albums: Record<string, Album> = getAlbums().reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  );

  return songs.map(({ album, ...song }) => ({
    ...song,
    album: albums[album] 
  }));

}
