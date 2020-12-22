import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";

const CustomResult = ({ message }) => {
  const { t } = useTranslation();

  return (
    <>
      <Result
        status="500"
        subTitle={message}
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            {t("customResult.text.refresh")}
          </Button>
        }
      />
    </>
  );
};
export default CustomResult;
