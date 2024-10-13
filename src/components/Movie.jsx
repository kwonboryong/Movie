import { Link } from "react-router-dom";
import s from "./Movie.module.css";

function Movie({ id, coverImg, name }) {
  return (
    <div className={s.cardBox}>
      <img src={coverImg} alt={name} />
      <h2>
        <Link to={`/movie/${id}`}>{name}</Link>
      </h2>
    </div>
  );
}

export default Movie;
