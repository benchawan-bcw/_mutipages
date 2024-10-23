import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { fetchProducts } from "./data/products";

import Layout from "./pages/layouts/Layout/Layout";
import Home from "./pages/home/Home";
import Todo from "./pages/Todo/Todo";
import Calcurator from "./pages/Calculator/Calculator";
import Component from "./pages/Component/Component";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import Animation from "./pages/Animation/Animation";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

const intTab = "home";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    setTab(intTab);
  }, []);

  useEffect(() => {
    setProducts(fetchProducts());
  }, []);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  tab={tab}
                  setTab={setTab}
                  products={products}
                  cart={cart}
                  setToken={setToken}
                  
                />
              }
            >
              <Route path={"/"} element={<Home />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/todo"} element={<Todo />} />
              <Route path={"/calculator"} element={<Calcurator />} />
              <Route path={"/components"} element={<Component />} />
              <Route
                path={"/products"}
                element={
                  <Products products={products} cart={cart} setCart={setCart} />
                }
              />
              <Route
                path={"/cart"}
                element={<Cart cart={cart} setCart={setCart} />}
              />
              <Route path={"/logout"} element={<Logout />} />
              <Route path={"/animation"} element={<Animation />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
