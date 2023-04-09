import { useRouter } from "next/router";
import cookie from "react-cookies";

const withAuth = (WrappedComponent: any) => {
  const accessToken = cookie.load("accessToken");
  return (props: any) => {
    if (typeof window === "undefined") return null;

    const Router = useRouter();

    if (!accessToken) {
      Router.replace("/");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
