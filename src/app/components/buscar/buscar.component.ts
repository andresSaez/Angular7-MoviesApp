import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  buscar = '';

  constructor(
    public _ps: PeliculasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buscar = this.route.snapshot.params.texto;

    if ( this.buscar ) {
      this.buscarPelicula();
    }
  }

  ngOnInit() {
  }

  buscarPelicula() {
    if ( this.buscar.length === 0) {
      return;
    }

    this._ps.buscarPelicula( this.buscar )
      .subscribe( data => {
        console.log(data);
      });


  }

}
