export type SongType = {
  album: string;
  artist: string;
  img: string;
  rank: number;
  title: string;
  url: string;
  urlPlay: string;
  year: string;
};

export type AlbumType = {
  name: string;
  poster: string;
  songs: SongType[];
};
