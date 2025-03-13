import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Main from "./components/Main";

function App() {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                    </Routes>
                </Router>
            </Provider>
        </>
    );
}

export default App;

// store:
//     - user
//         * initialState:
//         - info ({email: '', name: '', suraname: ''}) <Object{}>,
//         - token (null || 'string') <null||String>
//         - isCompleted (null || false || true) <null||Boolean>
