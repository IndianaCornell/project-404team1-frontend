import React from "react";
import styles from "./Hero.module.css";

import DrinkImg from "../../assets/images/HeroDrinkImage.png";
import FoodImg from "../../assets/images/HeroFoodImage.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>IMPROVE YOUR CULINARY TALENTS</h1>
      <p className={styles.subtitle}>
        Amazing recipes for beginners in the world of cooking, enveloping you in
        the aromas and tastes of various cuisines.
      </p>

      <button className={styles.btn}>ADD RECIPE</button>

      <div className={styles.images}>
        <img src={DrinkImg} alt="Drink" className={styles.img1} />
        <img src={FoodImg} alt="Food" className={` ${styles.img2}`} />
      </div>
    </section>
  );
};

export default Hero;
