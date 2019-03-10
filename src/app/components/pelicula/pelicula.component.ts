import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  pelicula: any;
  id: number;
  pagina = '';
  busqueda = '';

  constructor(
    private route: ActivatedRoute,
    public _ps: PeliculasService
  ) {
    this.id = this.route.snapshot.params.id;
    this.pagina = this.route.snapshot.params.pag;

    if ( this.route.snapshot.params.busqueda ) {
      this.busqueda = this.route.snapshot.params.busqueda;
    }

    this._ps.getPelicula( this.id )
      .subscribe( data => this.pelicula = data );

  }

  ngOnInit() {
  }

}
