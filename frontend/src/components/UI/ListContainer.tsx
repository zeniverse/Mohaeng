import styles from "./ListContainer.module.css";

const ListContainer = ({ children }: any) => {
  return <div className={styles["list-container"]}>{children}</div>;
};

export default ListContainer;
