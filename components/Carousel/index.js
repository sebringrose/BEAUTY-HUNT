import { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import SS from "./slider.module.css";

export default function Carousel({ children }) {
  const [mobileView, setMobileView] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: !mobileView ? 3 : 1,
    skipSnaps: true,
    // containScroll: "trimSnaps",
    loop: true
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const SLIDERCOUNT_BREAKPOINT = 900;
  const updateTimeout = useRef();
  const resizeHandler = useCallback(() => {
    clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => {
      setMobileView(document.body.clientWidth < SLIDERCOUNT_BREAKPOINT);
    }, 100);
  }, [setMobileView]);

  useEffect(() => {
    const cb = () => resizeHandler();

    // run callback once to make sure slidesToScroll is set for screen size
    cb();

    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, [resizeHandler]);

  return <Grid container>
    <Grid item xs={1} className="flex-center">
      <PrevButton onClick={scrollPrev} />
    </Grid>
    <Grid item xs={10}>
      <div className={SS["embla__wrapper"]}>
        <div ref={emblaRef} className={SS["embla"]}>
          <div className={SS["embla__container"]}>
            {children && children.map((child, i) => <div key={i} className={SS["embla__slide"]}>
              {child}
            </div>)}
          </div>
        </div>
      </div>
    </Grid>
    <Grid item xs={1} className="flex-center">
      <NextButton onClick={scrollNext} />
    </Grid>
  </Grid>;
};

const PrevButton = ({ onClick }) => (
  <button
    className={`${SS["embla__button"]} ${SS["embla__button--prev"]}`}
    onClick={onClick}
  >
    <svg className={SS["embla__button__svg"]} width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.302659 24.2833C-0.0931853 24.6684 -0.10187 25.3015 0.283261 25.6973C0.668391 26.0932 1.3015 26.1019 1.69734 25.7167L0.302659 24.2833ZM13 13.3248L13.6973 14.0415C13.8875 13.8565 13.9963 13.6036 13.9999 13.3383C14.0035 13.0731 13.9015 12.8172 13.7165 12.6272L13 13.3248ZM1.71648 0.302396C1.33121 -0.0933068 0.6981 -0.10176 0.302396 0.283516C-0.0933068 0.668792 -0.10176 1.3019 0.283516 1.6976L1.71648 0.302396ZM1.69734 25.7167L13.6973 14.0415L12.3027 12.608L0.302659 24.2833L1.69734 25.7167ZM0.283516 1.6976L12.2835 14.0224L13.7165 12.6272L1.71648 0.302396L0.283516 1.6976Z" fill="#1D1D1B"/>
    </svg>
  </button>
);

const NextButton = ({ onClick }) => (
  <button
  className={`${SS["embla__button"]} ${SS["embla__button--next"]}`}
    onClick={onClick}
  >
    <svg className={SS["embla__button__svg"]} width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.302659 24.2833C-0.0931853 24.6684 -0.10187 25.3015 0.283261 25.6973C0.668391 26.0932 1.3015 26.1019 1.69734 25.7167L0.302659 24.2833ZM13 13.3248L13.6973 14.0415C13.8875 13.8565 13.9963 13.6036 13.9999 13.3383C14.0035 13.0731 13.9015 12.8172 13.7165 12.6272L13 13.3248ZM1.71648 0.302396C1.33121 -0.0933068 0.6981 -0.10176 0.302396 0.283516C-0.0933068 0.668792 -0.10176 1.3019 0.283516 1.6976L1.71648 0.302396ZM1.69734 25.7167L13.6973 14.0415L12.3027 12.608L0.302659 24.2833L1.69734 25.7167ZM0.283516 1.6976L12.2835 14.0224L13.7165 12.6272L1.71648 0.302396L0.283516 1.6976Z" fill="#1D1D1B"/>
    </svg>
  </button>
);
