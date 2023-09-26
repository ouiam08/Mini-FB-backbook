import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/signin" element={<Auth/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App;
