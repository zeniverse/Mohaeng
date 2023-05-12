import Image from "next/image";
import React from "react";
import styles from "./HeaderSideMenu.module.css";
import { GrClose } from "react-icons/gr";

const HeaderSideMenu = () => {
  return (
    <div className={`${styles.mobileMenu}`}>
      <div className={styles["menu-top"]}>
        <div className={styles["logo-wrapper"]}>
          <Image
            src={"/assets/logo_desktop.png"}
            alt="logo"
            width={200}
            height={80}
            className={styles.logo}
          />
        </div>
        <GrClose />
      </div>
    </div>
  );
};

export default HeaderSideMenu;
