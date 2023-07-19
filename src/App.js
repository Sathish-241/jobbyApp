import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRouter from './components/ProtectedRouter'
import JobsList from './components/JobsList'
import JobDetails from './components/JobDetails'

import './App.css'
import NotFound from './components/NotFound'
// import Header from './components/Header'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div className="app-container">
    {/* <Header /> */}

    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRouter exact path="/" component={Home} />
      <ProtectedRouter exact path="/jobs" component={JobsList} />
      <ProtectedRouter exact path="/jobs/:id" component={JobDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
