import { palette, PaletteKeyTypes } from "@/src/styles/palette";
import styles from "./TagItem.module.css";

const TagItem = ({
  text,
  bgColor,
  color = "white",
  size = "M",
}: {
  text: string;
  bgColor?: PaletteKeyTypes;
  color?: "black" | "white";
  size?: "L" | "M" | "S" | "SS";
}) => {
  const settingBgColor = bgColor ? palette[bgColor] : "var(--color-primary)";
  const settingColor =
    color === "white" ? "var(--color-white)" : "var(--color-text-basic)";
  const style = { backgroundColor: settingBgColor, color: settingColor };
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
