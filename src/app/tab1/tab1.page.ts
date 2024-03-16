import {Component, inject, OnInit} from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Pelicula, RespuestaMDB} from "../interfaces/interfaces";
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  moviesService = inject(MoviesService)

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  }

  constructor() {
  }

  ngOnInit() {
    this.moviesService.getFeature().subscribe((resp) => {
      this.peliculasRecientes = resp.results;
    })

    this.getPopulares();
  }
  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe((resp) => {
      const arrTemp = [...this.peliculasPopulares, ...resp.results];
      this.peliculasPopulares= arrTemp;
    })
  }
}
