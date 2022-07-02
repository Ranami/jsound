import { AlbumType, SongType } from "./../types/musicTypes";
import { makeAutoObservable } from "mobx";

export class Store {
  currentSong: SongType = {};
  albums: AlbumType[] = [];
  album?: AlbumType = {};
  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentSong(song: SongType) {
    this.currentSong = song;
  }

  uploadAlbums(albums: AlbumType[]) {
    this.albums = albums;
  }

  setAlbum(album: AlbumType) {
    let choosenAlbum = this.albums.find((alb) => alb.name === album.name);
    this.album = choosenAlbum;
  }

  switchToNextSong() {
    let nextSong;
    let currentIndex = this.album?.songs?.findIndex(
      (item) => item.url === this.currentSong.url
    );
    if (currentIndex! >= this.album?.songs?.length! - 1) {
      nextSong = this.album?.songs?.[0];
    } else {
      nextSong = this.album?.songs?.[currentIndex! + 1];
    }
    this.changeCurrentSong(nextSong!);
  }

  switchToPreviousSong() {
    let nextSong;
    let currentIndex = this.album?.songs?.findIndex(
      (item) => item.url === this.currentSong.url
    );
    if (currentIndex! <= 0) {
      nextSong = this.album?.songs?.[this.album?.songs?.length! - 1];
    } else {
      nextSong = this.album?.songs?.[currentIndex! - 1];
    }
    this.changeCurrentSong(nextSong!);
  }
}

export const store = new Store();
