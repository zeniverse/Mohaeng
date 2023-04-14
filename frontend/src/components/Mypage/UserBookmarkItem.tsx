import Link from "next/link";
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
  createdDate: string;
  contentId: string;
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
      {prop.isPlace === true ? (
        <Link
          href={{
            pathname: "/place/[id]",
            query: { id: prop.contentId },
          }}
        >
          <img src={prop.image} alt={prop.image} />
        </Link>
      ) : (
        <Link
          href={{
            pathname: "/course/[id]",
            query: { id: prop.realId },
          }}
        >
          <img src={prop.image} alt={prop.image} />
        </Link>
      )}

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
        ) : (
          <p>{prop.createdDate}</p>
        )}
      </div>
    </div>
  );
};

export default UserBookmarkItem;
