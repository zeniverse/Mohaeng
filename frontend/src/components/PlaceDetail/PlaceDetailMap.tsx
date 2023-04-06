import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

// 위도, 경도 (mapY, mapX 좌표)
interface DetailMapProps {
  latitude: string;
  longitude: string;
}

const PlaceDetailMap = ({ latitude, longitude }: DetailMapProps) => {
  useEffect(() => {
    const { kakao } = window;
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APIKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          draggable: true,
          // 지도 생성할 때 확대, 축소 설정하는 옵션
        };
        const map = new kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <div
      id="map"
      style={{
        width: "400px",
        height: "350px",
      }}
    ></div>
  );
};

export default PlaceDetailMap;
