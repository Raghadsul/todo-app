import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router';
import AllTodos from './components/AllTodos';
import NewTodo from './components/NewTodo';

function App() {
  return (
    <div className="App">
      <Router> 
        <AllTodos path="/" />
        <NewTodo path="/todos/new" />
      </Router>
    </div>
  );
}

export default App;
