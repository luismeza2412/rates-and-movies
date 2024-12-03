import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

 public movies: any[] = [];
 public query: string = '';
 public haveData: string ='';

 constructor(private movieService: MovieService, private route: ActivatedRoute){}

 ngOnInit(): void {
   this.searchMovies();
 }


 searchMovies():void{
  try{
    this.route.queryParams.subscribe(params =>{
      this.query = params ['search'];
      this.movieService.searchMovies(this.query).subscribe(res =>{
        console.log(res)
        if(res.Search && res.Search.length>0){
          this.movies = res.Search || [];
        } else{
          this.haveData = 'No se encontraron películas con este título';
        }
      })
     })
  }catch(error){
    console.log('Error al buscar películas' + error);
    this.haveData= 'Lo sentimos, estamos presentando inconvenientes.'
  }
 }

}
