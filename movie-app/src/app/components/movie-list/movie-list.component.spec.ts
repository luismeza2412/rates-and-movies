import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockRoute = {
    queryParams: of({ search: 'batman' })
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['searchMovies']);

    await TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: ActivatedRoute, useValue: mockRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    const mockMovies = {
      Search: [
        { Title: 'Batman Begins', Year: '2005', Poster: 'url-to-image' },
        { Title: 'The Dark Knight', Year: '2008', Poster: 'url-to-image' }
      ]
    };
    movieService.searchMovies.and.returnValue(of(mockMovies));

    component.ngOnInit();
    expect(movieService.searchMovies).toHaveBeenCalledWith('batman');
    expect(component.movies.length).toBe(2);
  });
});
