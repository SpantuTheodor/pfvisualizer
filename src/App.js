import "./App.css";
import Grid from "./Grid";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <div>
      <Header />
      <Grid />
    </div>
  );
}

export default App;
