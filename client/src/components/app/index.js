import Root from "../../router/index";
import LanguageSwitch from "../languageSwitch";

import "./index.scss";

function App() {
  return (
    <div className="App">
      <LanguageSwitch />
      <Root />
    </div>
  );
}

export default App;
