import {
  ShoppingCartOutlined,
  NotificationOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";

export const adminMenuList = (t) => [
  {
    icon: <UsergroupDeleteOutlined />,
    title: t("menu.adminMenuList.user.text"),
    items: [
      { payload: "userList", title: t("menu.adminMenuList.user.items.1.text") },
    ],
  },
];

export const customerMenuList = (t) => [
  {
    icon: <ShoppingCartOutlined />,
    title: t("menu.customerMenuList.user.text"),
    items: [
      {
        payload: "productList",
        title: t("menu.customerMenuList.user.items.1.text"),
      },
    ],
  },
  {
    icon: <NotificationOutlined />,
    title: t("menu.customerMenuList.order.text"),
    items: [
      {
        payload: "orderNew",
        title: t("menu.customerMenuList.order.items.1.text"),
      },
      {
        payload: "orderList",
        title: t("menu.customerMenuList.order.items.2.text"),
      },
    ],
  },
  {
    icon: <ProfileOutlined />,
    title: t("menu.customerMenuList.stock.text"),
    items: [
      {
        payload: "stockList",
        title: t("menu.customerMenuList.stock.items.1.text"),
      },
    ],
  },
];
