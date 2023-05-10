import { palette, PaletteKeyTypes } from "@/src/styles/palette";
import styles from "./TagItem.module.css";

const TagItem = ({
  text,
  bgColor,
  color = "white",
  size = "M",
  icon,
}: {
  text: string;
  bgColor?: PaletteKeyTypes;
  color?: "black" | "white" | PaletteKeyTypes;
  size?: "L" | "M" | "S" | "SS";
  icon?: any;
}) => {
  const settingBgColor = bgColor ? palette[bgColor] : "var(--color-primary)";
  const settingColor =
    color === "white"
      ? "var(--color-white)"
      : color === "black"
      ? "var(--color-text-basic)"
      : palette[color];
  const style = { backgroundColor: settingBgColor, color: settingColor };
  return (
    <>
      <div
        className={`${styles["tag-item"]} ${styles[`tag-item-${size}`]}`}
        style={style}
      >
        <span className={styles.text}>
          {icon}
          {text}
        </span>
      </div>
    </>
  );
};

export default TagItem;
