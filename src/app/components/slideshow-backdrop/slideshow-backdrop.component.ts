import {Component, inject, Input, OnInit} from '@angular/core';
import {Pelicula} from "../../interfaces/interfaces";
import {ModalController} from "@ionic/angular";
import {DetalleComponent} from "../detalle/detalle.component";

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent  implements OnInit {

  @Input() movies: Pelicula[] = [];
  modalCtrl=inject(ModalController)

  constructor() { }

  ngOnInit() {}

  async verDetalle(id:number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
