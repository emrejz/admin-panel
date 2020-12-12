import { Result, Button } from "antd";

const CustomResult = ({ message }) => {
  return (
    <>
      <Result
        status="500"
        subTitle={message}
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Refresh site
          </Button>
        }
      />
    </>
  );
};
export default CustomResult;
