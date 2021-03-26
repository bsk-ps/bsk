import { Route, Switch } from "react-router";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/Home";
import { CryptoPartOne } from "./pages/PartOne";
import { CryptoPartTwo } from "./pages/PartTwo";
import {CryptoPartThree} from "./pages/PartThree";


function App() {
  return (
    <div>
      <Navbar>
        <div style={{ padding: '10px' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/zadanie1" component={CryptoPartOne} />
            <Route path="/zadanie2" component={CryptoPartTwo} />
            <Route path="/zadanie3" component={CryptoPartThree} />
          </Switch>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
