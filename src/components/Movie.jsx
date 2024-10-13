import s from "./Movie.module.css";

function Movie({ coverImg, name }) {
  return (
    <div className={s.cardBox}>
      <img src={coverImg} />
      <h2>{name}</h2>

      {/* <h3>Series</h3>
      <ul>
        {movie.comics.items.map((g) => (
          <li key={g}>
            <a href={g.resourceURI}>{g.name}</a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Movie;
