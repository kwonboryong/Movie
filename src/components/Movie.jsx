import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import s from "./Movie.module.css";

function Movie({ id, coverImg, name }) {
  return (
    <div className={s.cardBox}>
      <img src={coverImg} alt={name} />
      <h2 className={s.title}>
        <Link to={`/movie/${id}`}>{name}</Link>
      </h2>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Movie;
