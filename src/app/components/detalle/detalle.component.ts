import {Component, inject, Input, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {Cast, PeliculaDetalle} from "../../interfaces/interfaces";
import {ModalController} from "@ionic/angular";
import {DataLocalService} from "../../services/data-local.service";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input({required: true}) id!: number;
  pelicula: PeliculaDetalle = {}
  moviesServices = inject(MoviesService)
  oculto: number = 150;
  actores: Cast[] = []
  modalCtrl = inject(ModalController)
  dataLocal = inject(DataLocalService)
  estrella = 'star-outline'
  constructor() {
  }

  ngOnInit() {
    // console.log(this.id)
    this.dataLocal.existePelicula(this.id).then(existe => {
      this.estrella = (existe) ? 'star' : 'star-outline'
    })

    this.moviesServices.getPeliculaDetalle(this.id).subscribe(response => {
        this.pelicula = response
      }
    )
    this.moviesServices.getActoresPelicula(this.id).subscribe(
      response => {
        this.actores = response.cast
      }
    )
  }

  regresar() {
    this.modalCtrl.dismiss()
  }

  favorito() {
    console.log('Favorito')
    this.dataLocal.guardarPelicula(this.pelicula)
    this.estrella = (this.estrella === 'star') ? 'star-outline' : 'star'
  }

  protected readonly localStorage = localStorage;
}
