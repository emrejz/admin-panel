//comps
import SignForm from "./form";

//scss
import "./index.scss";

const Sign = () => {
  return (
    <div className="signContainer">
      <div>email: admin@a.com </div>
      <div>password: 123</div>
      <div>for access as admin </div>

      <SignForm />
    </div>
  );
};
export default Sign;
