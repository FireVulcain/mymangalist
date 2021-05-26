import { Signup } from "./components/Auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Home } from "./views/Home/Home";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
