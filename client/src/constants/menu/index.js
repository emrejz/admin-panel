import {
  ShoppingCartOutlined,
  NotificationOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";

export const adminMenuList = [
  {
    icon: <UsergroupDeleteOutlined />,
    title: "Kullanıcılar",
    items: [{ payload: "userList", title: "Listele" }],
  },
];

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
