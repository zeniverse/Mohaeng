import { useRouter } from "next/router";
import cookie from "react-cookies";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = cookie.load("accessToken");

      if (!accessToken) {
        Router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
