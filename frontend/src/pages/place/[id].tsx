import PlaceDetail from "@/src/components/PlaceDetail/PlaceDetail";
import { useRouter } from "next/router";

type Keyword = {
  addr: string;
  id: string;
  image: string;
  mapx: string;
  mapy: string;
  tel: string;
  title: string;
  review: number;
};

const Place = ({}) => {
  const router = useRouter();
  const id = router.query.id as string;
  const title = router.query.title as string;

  return (
    <>
      place: {id}
      <p> {title}</p>
      <PlaceDetail />
    </>
  );
};

export default Place;
