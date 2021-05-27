import { Signup } from "./components/Auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Home } from "./views/Home/Home";
import { Trending } from "./views/Trending/Trending";
import { Popular } from "./views/Popular/Popular";
import { Manhwa } from "./views/Manhwa/Manhwa";
import { Top100 } from "./views/Top-100/Top100";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/trending" component={Trending} />
                    <Route exact path="/popular" component={Popular} />
                    <Route exact path="/top-manhwa" component={Manhwa} />
                    <Route exact path="/top-100" component={Top100} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
