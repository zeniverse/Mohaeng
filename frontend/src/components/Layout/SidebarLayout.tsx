import Sidebar from "../Mypage/Sidebar";

const SidebarLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      {props.children}
    </>
  );
};

export default SidebarLayout;
