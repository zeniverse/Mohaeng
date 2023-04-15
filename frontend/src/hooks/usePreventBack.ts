import { useEffect } from "react";
import { useRouter } from "next/router";

export default function usePreventBack(
  message = "Are you sure you want to leave this page?"
): void {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
    };

    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        const leave = window.confirm(message);
        if (!leave) {
          router.events.emit("routeChangeError");
          router.replace(router.asPath);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, message]);
}
