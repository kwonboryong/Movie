import { useState, useEffect } from "react";
import s from "./Home.module.css";
import Movie from "@/components/Movie";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023"
      )
    ).json();

    setMovies(json.data.results);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>Marvel characters</h1>
      </div>
      {loading ? (
        <h1 className={s.loadingText}>Loading...</h1>
      ) : (
        <>
          <Swiper
            loop={true}
            autoplay={{
              delay: -12000,
              disableOnInteraction: false,
            }}
            style={{
              transition: "all 0s linear",
              marginTop: "50px",
            }}
            speed={5000}
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={3.5}
            onMouseEnter={(swiper) => {
              swiper.autoplay.stop();
            }}
            onMouseLeave={(swiper) => {
              swiper.autoplay.start();
            }}
            className={s.movieContainer}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    e.currentTarget.closest(".swiper").swiper.autoplay.stop();
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    e.currentTarget.closest(".swiper").swiper.autoplay.start();
                  }}
                >
                  <Movie
                    id={movie.id}
                    coverImg={`${movie.thumbnail.path}.${movie.thumbnail.extension}`}
                    name={movie.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default Home;
