import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  public param:string = '';

  constructor(private router:Router){}

  searchMovies():void{
    if(this.param.trim().length>=3){
      this.router.navigate(['/movies'], {queryParams: {search:this.param}});

    } else{
      alert('Por favor ingrese al menos tres caracteres para buscar.')
    }
  }

}
