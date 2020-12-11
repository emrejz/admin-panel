import { Menu } from "antd";
import {
  ShoppingCartOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import "./index.scss";

const { SubMenu } = Menu;
function CustomMenu() {
  return (
    <Menu mode="inline" className="cutomMenuCont">
      <SubMenu key="product" icon={<ShoppingCartOutlined />} title="Ürün">
        <Menu.Item key="productList">Listele</Menu.Item>
      </SubMenu>
      <SubMenu key="order" icon={<NotificationOutlined />} title="Sipariş">
        <Menu.Item key="orderNew">Bekleyen</Menu.Item>
        <Menu.Item key="orderList">Listele</Menu.Item>
      </SubMenu>
      <SubMenu key="stock" icon={<ProfileOutlined />} title="Stok">
        <Menu.Item key="stockList">Listele</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default CustomMenu;
