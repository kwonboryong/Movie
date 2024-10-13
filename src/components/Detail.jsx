import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./Detail.module.css";

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
        <h1 className={s.loadingText}>Loading...</h1>
      ) : (
        <div className={s.container}>
          {movies.map((movie) => (
            <div>
              <h2 className={s.title}>{movie.name}</h2>
              <div className={s.content}>
                <img
                  src={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
                  alt={movie.name}
                />

                <div className={s.seriesBox}>
                  <h3 className={s.series}>Series</h3>
                  <ul className={s.seriesTitle}>
                    {movie.series.items.map((g) => (
                      <li key={g}>
                        <a href={g.resourceURI}>{g.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
