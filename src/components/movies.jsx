import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from './common/like';
class Movies extends Component {
  state = {
    movies: getMovies()
  };
  handleDelete(movie) {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  }

  handleLike = (movie) => {
    console.log('Like clicked', movie);

  }
  render() {
    const { length } = this.state.movies;
    if (length === 0) return "There are no movies in the database";
    return (
      <React.Fragment>
        <h3>Showing {length} movies in the database</h3>
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
            {this.state.movies.map(movie => (
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
      </React.Fragment >
    );
  }
}

export default Movies;
