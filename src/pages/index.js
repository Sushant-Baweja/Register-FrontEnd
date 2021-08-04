import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './signUp.css';
import Header from './header';
import SignUp from './signup';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
    <Switch>
      <Route path="/">
        <SignUp />
      </Route> 
    </Switch>

    </Router>
  );
}

export default App;
