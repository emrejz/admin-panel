import { useEffect, useState } from "react";
import { Spin } from "antd";

//comps
import customNotification from "../../customNotification";

const SessionHOC = (WrappedComponent) =>
  function WrapperFn(props) {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
      const _fetch = async () => {
        try {
          setLoading(true);
          setSession(null);
          setError(null);
          const result = await fetch(
            process.env.REACT_APP_CUSTOMER_PRODUCT_API + "/api/auth",
            {
              method: "post",
              headers: {
                Authorization: token,
              },
            }
          );
          const res = await result.json();
          if (res.error) {
            setError(res.error);
          } else {
            setSession(res);
          }
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      token && _fetch();
    }, [token]);
    useEffect(() => {
      if (error) {
        customNotification({
          title: "Authenticate error!",
          description: error.message,
        });
        localStorage.removeItem("token");
      }
    }, [error]);
    return (
      <>
        {loading ? (
          <Spin
            size="large"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <WrappedComponent {...props} session={session} error={error} />
        )}
      </>
    );
  };
export default SessionHOC;
