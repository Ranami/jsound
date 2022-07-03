import { AlbumType, SongType } from "./../types/musicTypes";
import { makeAutoObservable, toJS } from "mobx";

export class Store {
  currentSong: SongType =
    JSON.parse(localStorage.getItem("currentSong")!) || {};
  albums: AlbumType[] = [];
  album?: AlbumType = JSON.parse(localStorage.getItem("currentAlbum")!) || {};
  modalOpen: boolean = false;
  favourite: AlbumType = JSON.parse(localStorage.getItem("favourite")!) || {
    name: "Favourite",
    songs: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  addToFavourite(song: SongType) {
    const fav = { ...this.favourite };

    if (
      !toJS(this.favourite).songs?.some((favsong) => favsong.url === song.url)
    ) {
      fav.songs = [...this.favourite.songs!, song];
      this.favourite = { ...fav };
      localStorage.setItem("favourite", JSON.stringify(this.favourite));
    } else {
      let result = fav.songs?.filter((favsong) => favsong.url !== song.url);
      this.favourite = { ...fav, songs: result };
      localStorage.setItem("favourite", JSON.stringify(this.favourite));
    }
  }

  setModalOpen(flag: boolean) {
    this.modalOpen = flag;
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
