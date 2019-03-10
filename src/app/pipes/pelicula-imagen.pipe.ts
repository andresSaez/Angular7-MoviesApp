import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  transform(pelicula: any, poster: boolean = false ): any {

    const URL = 'http://image.tmdb.org/t/p/w500/';

    if ( poster ) {
      return URL + pelicula.poster_path;
    }

    if (pelicula.backdrop_path ) {
      return URL + pelicula.backdrop_path;
    } else {
      if ( pelicula.poster_path ) {
        return URL + pelicula.poster_path;
      } else {
        return 'assets/img/no-image-available.png';
      }
    }
  }

}
