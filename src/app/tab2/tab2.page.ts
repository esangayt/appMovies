import {Component, inject} from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Pelicula} from "../interfaces/interfaces";
import {DetalleComponent} from "../components/detalle/detalle.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  moviesService = inject(MoviesService)
  buscando = false;
  textoBuscar = '';
  ideas = [
    'spiderman', 'superman', 'batman', 'flash', 'wonderwoman',
    'ironman', 'hulk', 'thor', 'capitan america', 'antman',
  ]
  modalCtrl=inject(ModalController)

  peliculas: Pelicula[] = [];

  constructor() {
  }

  buscar(event: CustomEvent) {
    this.buscando = true;
    this.textoBuscar = event.detail.value;

    if (this.textoBuscar.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.moviesService.buscarPeliculas(this.textoBuscar).subscribe(resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  onClear(event: CustomEvent) {
    this.textoBuscar = '';
  }

  seleccionarOpcion(idea: string) {
    this.textoBuscar = idea;
  }

  async detalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
