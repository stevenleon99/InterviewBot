import Register from "./components/Register";
import Chatdisplay from "./components/Displaychat"
import Header from "./components/Header"
import Record from "./components/Record"
import Talk from "./components/Talk";

const App = () => {
  
  return (
    <div className="App">
      <div className="level-center">
        <Header></Header>
        <div className="level-item">
          <Register></Register>
        </div>
        <div className="level-item">
          <Chatdisplay></Chatdisplay>
        </div>
        <div className="level-item">
          <div className="level-left">
            <Record></Record>
            <Talk></Talk>
            <button className="button is-info is-hover" style={{width:"100px"}}>SPEAK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
