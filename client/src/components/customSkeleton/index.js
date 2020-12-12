import { Skeleton } from "antd";

const CustomSkeleton = ({ n }) => {
  const arr = [...Array(n).keys()];
  return (
    <>
      {arr.map((item) => (
        <Skeleton key={item} loading={true} active></Skeleton>
      ))}
    </>
  );
};
export default CustomSkeleton;
