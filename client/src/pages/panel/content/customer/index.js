import { useSelector } from "react-redux";

//comps
import CustomerProducts from "./product";

export default () => {
  const { name } = useSelector((state) => state.selectedMenuItem);

  if (name === "productList") return <CustomerProducts />;
  else return <div></div>;
};
