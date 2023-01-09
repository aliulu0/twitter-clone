import { Routes, Route } from "react-router-dom";
import SignIn from "./components/Account/SignIn";
import { AuthContextProvider } from "./context/UserContext";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import PostDetail from "./Pages/PostDetail";
function App() {
  return (
    <>
      <AppContextProvider>
      <AuthContextProvider>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
      </AppContextProvider>
    </>
  );
}

export default App;
