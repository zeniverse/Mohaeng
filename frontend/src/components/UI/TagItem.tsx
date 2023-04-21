import { palette, PaletteKeyTypes } from "@/src/styles/palette";
import styles from "./TagItem.module.css";

const TagItem = ({
  text,
  bgColor,
  size = "M",
}: {
  text: string;
  bgColor?: PaletteKeyTypes;
  size?: "L" | "M" | "S";
}) => {
  const settingBgColor = bgColor ? palette[bgColor] : "var(--color-primary)";
  const style = { backgroundColor: settingBgColor };
  return (
    <>
      <div
        className={`${styles["tag-item"]} ${styles[`tag-item-${size}`]}`}
        style={style}
      >
        <span className={styles.text}>{text}</span>
      </div>
    </>
  );
};

export default TagItem;
