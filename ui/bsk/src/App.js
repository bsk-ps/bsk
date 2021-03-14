import { Route, Switch } from "react-router";
import { Navbar } from "./components/navbar/Navbar";
import { CryptoPartOne, CryptoPartTwo } from "./pages/home/crypto";
import { Home } from "./pages/home/Home";


function App() {
  return (
    <div>
      <Navbar>
        <div style={{ padding: '10px' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/zadanie1" component={CryptoPartOne} />
            <Route path="/zadanie2" component={CryptoPartTwo} />
          </Switch>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
