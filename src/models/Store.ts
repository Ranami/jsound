import { AlbumType, SongType } from "./../types/musicTypes";
import { makeAutoObservable, toJS } from "mobx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";

export class Store {
  currentSong: SongType =
    JSON.parse(localStorage.getItem("currentSong")!) || {};
  albums: AlbumType[] = [];
  album?: AlbumType = JSON.parse(localStorage.getItem("currentAlbum")!) || {};
  modalOpen: boolean = false;
  autoplay: boolean = true;
  favourite: AlbumType = JSON.parse(localStorage.getItem("favourite")!) || {
    name: "Favourite",
    songs: [],
  };
  isLogged: boolean = false;
  userName: string = "";

  constructor() {
    makeAutoObservable(this);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setIsLogged(true);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.setUserName(doc.data()?.name);
          });
      } else {
        this.setIsLogged(false);
      }
    });
  }

  setUserName(name: string) {
    this.userName = name;
  }

  setIsLogged(flag: boolean) {
    this.isLogged = flag;
  }

  setAutoplayToTrue() {
    this.autoplay = true;
  }
  setAutoplayToFalse() {
    this.autoplay = false;
  }

  cleanFavourite() {
    this.favourite = { name: "Favourite", songs: [] };
    localStorage.removeItem("favourite");
  }

  setFavourite(album: AlbumType) {
    this.favourite = album;
    localStorage.setItem("favourite", JSON.stringify(this.favourite));
  }

  addToFavourite(song: SongType, choosenAlbum: AlbumType) {
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

    if (choosenAlbum.name === "Favourite") {
      this.album = { ...this.favourite };
      localStorage.setItem("currentAlbum", JSON.stringify(this.album));
    }
  }

  setModalOpen(flag: boolean) {
    this.modalOpen = flag;
  }

  changeCurrentSong(song: SongType) {
    this.setAutoplayToTrue();
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
    this.setAutoplayToTrue();
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
    this.setAutoplayToTrue();
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
