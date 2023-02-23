import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Copyright ⓒ Mohaeng Corp. All rights
        reserved ❤️ by{" "}
        <a href="https://github.com/Mohaeng2023/Mohaeng">Team Mohaeng</a>
      </p>
    </footer>
  );
};

export default Footer;
