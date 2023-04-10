import axios from "axios";
import FiveStarRating from "../FiveStarRating/FiveStarRating";
import styles from "./UserBookmarkItem.module.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import cookie from "react-cookies";
import { useSelector } from "react-redux";
import { getCourseBookmark } from "@/src/store/reducers/CourseBoomarkSlice";

export interface bookmarkState {
  id: number;
  image: string;
  name: string;
  desc: string;
  rating: number;
  realId: number;
  isRating: boolean;
  isPlace: boolean;
}

const UserBookmarkItem = (prop: bookmarkState) => {
  const appDispatch = useAppDispatch();
  const accessToken = cookie.load("accessToken");

  const delBookmark = () => {
    if (prop.isPlace) {
      const response = async () => {
        await axios.delete(`/api/place/bookmark/${prop.realId}`, {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        });
      };
      response().then(() => {
        appDispatch(getPlaceBookmark(accessToken));
      });
    } else {
      const response = async () => {
        await axios.delete(`/api/course/bookmark/${prop.realId}`, {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        });
      };
      response().then(() => {
        appDispatch(getCourseBookmark(accessToken));
      });
    }
  };

  return (
    <div key={prop.id} className={styles["bookmark-item"]}>
      <img src={prop.image} alt={prop.image} />
      <div>
        <div className={styles.keywordBookmark}>
          <BsBookmarkFill className={styles.bookmark} onClick={delBookmark} />
        </div>
        <h2>{prop.name}</h2>
        <p>{prop.desc}</p>
        {prop.isRating === true ? (
          <p>
            <FiveStarRating rating={prop.rating.toString()} />
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default UserBookmarkItem;
