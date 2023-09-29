import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import PrivateRoute from "./containers/PrivateRootes/PrivateRoute";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<PrivateRoute redirectTo="/register"><Register /></PrivateRoute>} />
                <Route path="/signin" element={<PrivateRoute redirectTo="/signin"><Auth /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute redirectTo="/"><Home /></PrivateRoute>} />
                <Route path="/profile/:id" element={<PrivateRoute redirectTo="/profile/:id"><Profile /></PrivateRoute>} />
                <Route path="/*" element={<PrivateRoute redirectTo="/*"></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
