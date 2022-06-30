import { SongType } from "./../types/musicTypes";
import { makeAutoObservable } from "mobx";

export class Store {
  currentSong: SongType = {};
  constructor() {
    makeAutoObservable(this);
  }

  changeCurrentSong(song: SongType) {
    this.currentSong = song;
  }
}

export const store = new Store();
