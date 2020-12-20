import {
  ShoppingCartOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

export const customerMenuList = [
  {
    icon: <ShoppingCartOutlined />,
    title: "Ürün",
    items: [{ payload: "productList", title: "Listele" }],
  },
  {
    icon: <NotificationOutlined />,
    title: "Sipariş",
    items: [
      { payload: "orderNew", title: "Bekleyen" },
      { payload: "orderList", title: "Listele" },
    ],
  },
  {
    icon: <ProfileOutlined />,
    title: "Stok",
    items: [{ payload: "stockList", title: "Listele" }],
  },
];
