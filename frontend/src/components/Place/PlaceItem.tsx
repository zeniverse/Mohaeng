import styles from "./PlaceItem.module.css";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { content } from "@/src/store/reducers/PlaceSlice";
import axios from "axios";
import cookie from "react-cookies";
import { setPlace } from "@/src/store/reducers/PlaceSlice";
import { RootState } from "@/src/store/store";
import { useAppDispatch } from "@/src/hooks/useReduxHooks";
import { getPlaceBookmark } from "@/src/store/reducers/PlaceBookmarkSlice";

const PlaceItem = ({
  name,
  firstImage,
  areaCode,
  placeId,
  isBookmarked,
  contentId,
}: content) => {
  const accessToken = cookie.load("accessToken");

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const page = useSelector((state: RootState) => state.page.page);

  const addBookmark = () => {
    const response = async () => {
      await axios.post(
        `/api/place/bookmark/${placeId}`,
        {},
        {
          headers: {
            "Access-Token": accessToken,
          },
          withCredentials: true,
        }
      );
    };
    response().then(async () => {
      await axios
        .get(`/places`, {
          headers: {
            "Access-Token": accessToken,
          },
          params: {
            areaCode: areaCode,
            page: page,
          },
          withCredentials: true,
        })
        .then((res) => dispatch(setPlace(res.data.data)))
        .then(() => {
          appDispatch(getPlaceBookmark(accessToken));
        });
    });
  };

  const delBookmark = () => {
    const response = async () => {
      await axios.delete(`/api/place/bookmark/${placeId}`, {
        headers: {
          "Access-Token": accessToken,
        },
        withCredentials: true,
      });
    };
    response().then(async () => {
      await axios
        .get(`/places`, {
          headers: {
            "Access-Token": accessToken,
          },
          params: {
            areaCode: areaCode,
            page: page,
          },
          withCredentials: true,
        })
        .then((res) => dispatch(setPlace(res.data.data)))
        .then(() => {
          appDispatch(getPlaceBookmark(accessToken));
        });
    });
  };
  return (
    <div className={styles["place-item-container"]}>
      <div className={styles["item-info-container"]}>
        <Link
          href={{
            pathname: "/place/[id]",
            query: { id: contentId },
          }}
        >
          <div className={styles["item-image"]}>
            <div className={styles["item-image-box"]}></div>
            <Image
              src={firstImage}
              alt={name}
              width={700}
              height={700}
              priority
            />
          </div>
        </Link>
        <div className={styles["item-nav-container"]}>
          {/* <div className={styles["item-nav"]}>{placeRating}</div> */}
          <div className={styles["item-nav"]}>
            {isBookmarked === true ? (
              <BsBookmarkFill
                onClick={delBookmark}
                className={styles.bookmark}
              />
            ) : (
              <BsBookmark onClick={addBookmark} className={styles.unbookmark} />
            )}
          </div>
        </div>
      </div>

      <div>
        <Link
          href={{
            pathname: "/place/[id]",
            query: { id: placeId },
          }}
        >
          <div className={styles["item-info-text"]}>
            <h3> {name}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PlaceItem;
