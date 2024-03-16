import {Component, inject, Input, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {Cast, PeliculaDetalle} from "../../interfaces/interfaces";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input({
    required: true
  }) id!: number;
  pelicula: PeliculaDetalle = {}
  moviesServices = inject(MoviesService)
  oculto: number = 150;
  actores: Cast[] = []
  modalCtrl = inject(ModalController)
  constructor() {
  }

  ngOnInit() {
    // console.log(this.id)
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

  regresar(){
    this.modalCtrl.dismiss()
  }

  favorito(){
    console.log('Favorito')
  }

}
