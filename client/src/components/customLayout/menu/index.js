import { useDispatch } from "react-redux";
import { actionTypes } from "../../../store/selectMenu/constants";
import { Menu } from "antd";
import {
  ShoppingCartOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import "./index.scss";

const { SubMenu } = Menu;
function CustomMenu() {
  const dispatch = useDispatch();
  return (
    <Menu mode="inline" className="cutomMenuCont">
      <SubMenu key="product" icon={<ShoppingCartOutlined />} title="Ürün">
        <Menu.Item
          key="productList"
          onClick={(e) =>
            dispatch({
              type: actionTypes.SELECT_MENU_ITEM,
              payload: "productList",
            })
          }
        >
          Listele
        </Menu.Item>
      </SubMenu>
      <SubMenu key="order" icon={<NotificationOutlined />} title="Sipariş">
        <Menu.Item
          key="orderNew"
          onClick={(e) =>
            dispatch({
              type: actionTypes.SELECT_MENU_ITEM,
              payload: "orderNew",
            })
          }
        >
          Bekleyen
        </Menu.Item>
        <Menu.Item
          key="orderList"
          onClick={(e) =>
            dispatch({
              type: actionTypes.SELECT_MENU_ITEM,
              payload: "orderList",
            })
          }
        >
          Listele
        </Menu.Item>
      </SubMenu>
      <SubMenu key="stock" icon={<ProfileOutlined />} title="Stok">
        <Menu.Item
          key="stockList"
          onClick={(e) =>
            dispatch({
              type: actionTypes.SELECT_MENU_ITEM,
              payload: "stockList",
            })
          }
        >
          Listele
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default CustomMenu;
