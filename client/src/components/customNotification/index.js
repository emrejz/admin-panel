import { notification } from "antd";

export default ({ title, description }) =>
  notification.open({
    message: title,
    description,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
