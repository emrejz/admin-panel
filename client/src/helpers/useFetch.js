import { useTranslation } from "react-i18next";
import customNotification from "../components/customNotification";

const useFetch = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const fetchOperation = async (method, path, body) => {
    try {
      const result = await fetch(
        process.env.REACT_APP_CUSTOMER_PRODUCT_API + path,
        {
          method,
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify(body),
        }
      );
      const res = await result.json();

      if (res.error) {
        throw new Error(res.error.message);
      } else {
        customNotification({
          title: t("useFetch.text.success"),
          description: `${t("useFetch.text." + method)} ${t(
            "useFetch.text.success"
          )}`,
        });
        return res;
      }
    } catch (error) {
      customNotification({
        title: t("useFetch.text.failed"),
        description: `${t("useFetch.text." + method)} ${t(
          "useFetch.text.failed"
        )} ${t("fetch.code." + error.code)}`,
      });
      throw new Error(error.message);
    }
  };

  return {
    fetchOperation,
  };
};
export default useFetch;
