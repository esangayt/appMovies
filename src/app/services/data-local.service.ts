import {inject, Injectable} from '@angular/core';
import {PeliculaDetalle} from "../interfaces/interfaces";
import {Storage} from '@ionic/storage-angular';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  storage = inject(Storage);
  private _storage: Storage | null = null;
  toastCtrl = inject(ToastController)
  peliculas: PeliculaDetalle[] = [];

  constructor() {
    this.init();
  }

  async init() {
    await this.storage.create();
    await this.cargarPeliculas();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
      this.presentToast(mensaje);
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
      this.presentToast(mensaje);
    }
    this.storage.set('peliculas', this.peliculas);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
    });

    await toast.present();
  }

  async cargarPeliculas() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number) {
    await this.cargarPeliculas();
    const existe = this.peliculas.find(peli => peli.id === id);
    return !!(existe);
  }
}
