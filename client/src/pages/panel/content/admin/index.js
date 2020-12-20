import { useSelector } from "react-redux";

//comps
import AdminUsers from "./user";

export default () => {
  const { name } = useSelector((state) => state.selectedMenuItem);
  if (name === "userList") return <AdminUsers />;
  else return <div></div>;
};
