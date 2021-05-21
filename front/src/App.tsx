import React, { useContext } from "react";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import AdminPage from "./Components/Pages/Admin/AdminPage";
import Login from "./Components/Pages/Authentification/Login";
import Profile from "./Components/Pages/Profile/Profile";
import { myContext } from "./Context/Context";
import Register from "./Components/Pages/Authentification/Register";
import News from "./Components/Pages/Profile/News";

function App() {
  const ctx = useContext(myContext);
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        {ctx ? (
          <>
            {ctx.isAdmin ? (
              <Route path="/admin" exact component={AdminPage} />
            ) : null}
            <Route path="/profile" exact component={Profile} />
            <Route path="/news" exact component={News} />
          </>
        ) : (
          <>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
