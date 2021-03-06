import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

//constants
import { actionTypes } from "../../../store/selectMenu/constants";
import { customerMenuList, adminMenuList } from "../../../constants/menu";
import { adminRole } from "../../../constants/general";

//scss
import "./index.scss";

const { SubMenu } = Menu;

function CustomMenu({ role }) {
  const { t } = useTranslation();
  const list = role === adminRole ? adminMenuList(t) : customerMenuList(t);
  const dispatch = useDispatch();
  return (
    <Menu mode="inline" className="cutomMenuCont">
      {list.map(({ title, icon, items }) => (
        <SubMenu key={title} icon={icon} title={title}>
          {items.map(({ payload, title }) => (
            <Menu.Item
              key={payload}
              onClick={(e) =>
                dispatch({
                  type: actionTypes.SELECT_MENU_ITEM,
                  payload,
                })
              }
            >
              {title}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
}

export default CustomMenu;
