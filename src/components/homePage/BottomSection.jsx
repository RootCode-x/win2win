"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

const BottomSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className={`${styles.content} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <div className={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
          <h1 className={styles.headerStyleTop}>
          Win2win Bangladesh - Your Ultimate Destination for Online Gaming
            and Betting
          </h1>
          <p className={styles.sectionStyle}>
            Welcome to Win2win Bangladesh, where the thrill of online gaming
            meets the excitement of sports betting, all under one roof. Whether
            you’re a seasoned gamer or new to the world of online gambling,
            Win2win offers a dynamic platform that caters to all your gaming
            and betting needs. With a wide array of games from top providers and
            an innovative betting exchange, we are here to deliver an
            unparalleled experience to players across Bangladesh.
          </p>

          <h2 className={styles.headerStyle}>A World of Gaming Options</h2>
          <p className={styles.sectionStyle}>
            At Win2win, we pride ourselves on offering a diverse selection of
            games that appeal to every type of player. Our platform features an
            extensive lineup of games from industry-leading providers such as
            I-Sports, JDB, CQ9, Pocket Games, and Evolution. Whether you’re into
            high-octane slots, classic table games, or immersive live dealer
            experiences, our collection has something for everyone.
          </p>

          <p className={styles.sectionStyle}>
            For fans of live casino action, Sexy and Evolution bring the glamour
            of the casino floor directly to your screen with professional
            dealers and real-time gameplay. If you prefer the strategic
            challenge of poker, BPOKER offers a variety of tables and
            tournaments to test your skills against players from around the
            world.
          </p>

          <h2 className={styles.headerStyle}>
            Explore Innovative Betting Exchanges
          </h2>
          <p className={styles.sectionStyle}>
          Win2win is not just about casino games; we also offer an exciting
            betting exchange that allows you to bet directly against other
            players. This unique feature gives you more control over your bets
            and often better odds compared to traditional betting platforms.
            Whether you’re placing a wager on a cricket match, football game, or
            horse race, our Exchange platform provides you with the tools to
            make smart, informed bets.
          </p>

          <p className={styles.sectionStyle}>
            Our sports betting options are powered by top providers like JB
            Sports, Horsebook, and E1SPORT, ensuring that you have access to the
            latest odds and a wide range of betting markets. From pre-match bets
            to live, in-play betting, we cover all the major sports and events,
            giving you the chance to bet on your favorite teams and athletes.
          </p>

          <h2 className={styles.headerStyle}>
            Dive into a Diverse Game Collection
          </h2>
          <p className={styles.sectionStyle}>
          Win2win Bangladesh is home to a vast array of games that cater to
            every player’s preferences. Our partnership with providers such as
            Joker, KA, RT, SG, and JILI means that you can explore a rich
            variety of slots, from high-volatility games with massive jackpots
            to more casual, low-risk options. Each game is designed with
            cutting-edge graphics, innovative features, and engaging themes to
            keep you entertained.
          </p>

          <h2 className={styles.headerStyle}>
            Maximize Your Winnings with Bonuses and Promotions
          </h2>
          <p className={styles.sectionStyle}>
            At Win2win, we believe in rewarding our players. That’s why we
            offer a variety of bonuses and promotions designed to enhance your
            gaming experience. New players can take advantage of our generous
            welcome bonus, while regular players can enjoy ongoing promotions
            such as deposit matches, free spins, and cashback offers. These
            bonuses give you extra value and more chances to win big.
          </p>

          <h2 className={styles.headerStyle}>Play with Confidence</h2>
          <p className={styles.sectionStyle}>
            Your safety and security are our top priorities at Win2win. We’ve
            partnered with reputable providers like PT, WorldMatch, NETENT, and
            PNG to ensure that all our games are fair and that your personal
            information is protected. Our platform uses state-of-the-art
            encryption technology to safeguard your data, so you can play with
            peace of mind knowing that you’re in a secure environment.
          </p>

          <h2 className={styles.headerStyle}>
            Join the Win2win Bangladesh Community
          </h2>
          <p className={styles.sectionStyle}>
            Are you ready to experience the best in online gaming and betting?
            Join the Win2win Bangladesh community today and discover a world of
            entertainment at your fingertips. Our user-friendly platform is
            designed to make it easy for you to navigate through our extensive
            game library, place bets on your favorite sports, and take advantage
            of our exciting promotions. Don’t forget to invite your friends to
            join the fun and start earning extra rewards through our referral
            program. With Win2win, the possibilities are endless – start your
            gaming adventure now and see where the excitement takes you!
          </p>
        </div>
      </div>
      <div className={styles.button_div}>
        <button
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse content" : "Expand content"}
          onClick={toggleReadMore}
          className={styles.show_more_btn}
        >
          <span> {isExpanded ? "Show more" : "Show less"}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomSection;
