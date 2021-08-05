import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './signup';

function App() {
  return (
    <Router>      
    <Switch>
      <Route path="/">
        <SignUp />
      </Route> 
    </Switch>

    </Router>
  );
}

export default App;
