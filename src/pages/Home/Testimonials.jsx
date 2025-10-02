import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectTestimonials,
  selectTestimonialsLoading,
  selectTestimonialsError,
} from "@/redux/slices/testimonialsSlice";
import { getTestimonials } from "@/redux/slices/testimonialsOperations";

import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from "@/redux/slices/usersSlice";
import { getUsers } from "@/redux/slices/usersOperations";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./Testimonials.module.css";
import DoubleQuotationIcon from "@assets/icons/doubleQuotation.svg?react";

const AUTOPLAY_MS = 3000;

export default function Testimonials() {
  const dispatch = useDispatch();

  const testimonials = useSelector(selectTestimonials);
  const testimonialsLoading = useSelector(selectTestimonialsLoading);
  const testimonialsError = useSelector(selectTestimonialsError);

  const users = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);
  const usersError = useSelector(selectUsersError);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) dispatch(getTestimonials());
    if (users.length === 0) dispatch(getUsers());
  }, [dispatch]);

  const autoplay = useRef(
    Autoplay({
      delay: AUTOPLAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: testimonials.length > 1 },
    [autoplay.current]
  );

  const onSelect = useCallback(() => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setSelectedIndex(0);
  }, [emblaApi, testimonials.length]);

  const scrollTo = (index) => emblaApi.scrollTo(index);

  // проста мапа id -> name
  const idToName = useMemo(() => {
    const map = new Map();
    users.forEach((user) => {
      map.set(user._id.$oid, user.name);
    });
    return map;
  }, [users]);

  const resolveAuthorName = (ownerId) => idToName.get(ownerId) || ownerId;

  const showLoading = testimonialsLoading || usersLoading;
  const combinedError = testimonialsError || usersError;

  return (
    <section className={styles.testimonialsWrapper}>
      <p className={styles.sectionEyebrow}>What our customers say</p>
      <h2 className={styles.sectionTitle}>TESTIMONIALS</h2>

      {showLoading && <div className={styles.loadingStatus}>Loading…</div>}
      {!showLoading && combinedError && (
        <div className={styles.errorMessage}>
          Error: {String(combinedError)}
        </div>
      )}

      {!showLoading && !combinedError && testimonials.length > 0 && (
        <>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {testimonials.map((t, idx) => (
                <div className={styles.emblaSlide} key={t.id || t.ownerId}>
                  <article className={styles.testimonialCard}>
                    <DoubleQuotationIcon className={styles.quotationIcon} />

                    <p className={styles.testimonialText}>{t.testimonial}</p>
                    <div className={styles.testimonialAuthor}>
                      {resolveAuthorName(t.ownerId)}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <nav
            className={styles.paginationDots}
            aria-label="Testimonials pagination"
          >
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.paginationDot} ${
                  idx === selectedIndex ? styles.paginationDotActive : ""
                }`}
                onClick={() => scrollTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={idx === selectedIndex ? "true" : "false"}
              />
            ))}
          </nav>
        </>
      )}
    </section>
  );
}
