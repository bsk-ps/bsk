import { Navbar } from "./components/Navbar";
import { Home } from "./pages/home/Home";


function App() {
  return (
    <div>
      <Navbar>
        <div style={{padding: '10px'}}>
          <Home />
        </div>
      </Navbar>
    </div>
  );
}

export default App;
