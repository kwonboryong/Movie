import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [movies, setMovies] = useState([]);

  console.log(id);
  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
      )
    ).json();

    setMovies(json.data.results);
    setloading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <div>
              <h2>{movie.name}</h2>
              <img
                src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
                alt={movie.name}
              />

              <h3>Series</h3>
              <ul>
                {movie.series.items.map((g) => (
                  <li key={g}>
                    <a href={g.resourceURI}>{g.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
