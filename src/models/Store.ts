import { AlbumType, SongType } from "./../types/musicTypes";
import { makeAutoObservable } from "mobx";

export class Store {
  currentSong: SongType =
    JSON.parse(localStorage.getItem("currentSong")!) || {};
  albums: AlbumType[] = [];
  album?: AlbumType = JSON.parse(localStorage.getItem("currentAlbum")!) || {};
  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentSong(song: SongType) {
    this.currentSong = song;
    localStorage.setItem("currentSong", JSON.stringify(this.currentSong));
  }

  uploadAlbums(albums: AlbumType[]) {
    this.albums = albums;
  }

  setAlbum(album: AlbumType) {
    this.album = album;
    localStorage.setItem("currentAlbum", JSON.stringify(album));
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
