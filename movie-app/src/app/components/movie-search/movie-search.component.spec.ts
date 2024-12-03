import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieSearchComponent } from './movie-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSearchComponent],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Por favor ingrese al menos tres caracteres para buscar.', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.param = 'ab';
    component.searchMovies();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should navigate with query if valid', () => {
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.param = 'movie';
    component.searchMovies();
    expect(navigateSpy).toHaveBeenCalledWith(['/movies'], { queryParams: { search: 'movie' } });
  });
});
