import customNotification from "../components/customNotification";

const useFetch = () => {
  const message = (method) =>
    method === "post" ? "ekleme" : method === "put" ? "güncelleme" : "silme";
  const fetchOperation = async (method, path, body) => {
    try {
      const result = await fetch(
        process.env.REACT_APP_CUSTOMER_PRODUCT_API + path,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const res = await result.json();

      if (res.error) {
        throw new Error(res.error.message);
      } else {
        customNotification({
          title: "Başarılı!",
          description: `Ürün ${message(method)} başarılı!`,
        });
        return res;
      }
    } catch (error) {
      customNotification({
        title: "Başarısız!",
        description: `Ürün ${message(method)} başarısız oldu! Error: ${
          error.message
        }`,
      });
      throw new Error(error.message);
    }
  };

  return {
    fetchOperation,
  };
};
export default useFetch;
