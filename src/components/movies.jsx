import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
  handleDelete(movie) {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });

  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genre) => {
    console.log(genre);
  }
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return "There are no movies in the database";
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h3>Showing {count} movies in the database</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <Pagination itemsCount={count} pageSize={this.state.pageSize} onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage} />
        </div>
      </div>



    );
  }
}

export default Movies;
