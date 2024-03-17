import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Pelicula, PeliculaDetalle} from "../../interfaces/interfaces";
import {DetalleComponent} from "../detalle/detalle.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {

  @Input() movies: Pelicula[] | PeliculaDetalle[] = [];
  modalCtrl=inject(ModalController)
  @Output() modalClosed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    console.log("----")
  }

  async verDetalle(id:number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

    const { data } = await modal.onDidDismiss();

    this.modalClosed.emit();

  }
}
