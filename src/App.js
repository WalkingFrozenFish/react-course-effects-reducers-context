import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Хук useEffect - Данный хук работает с побочными эффектами.
  // Побочный эффект, это все то, что не имеет связи с отрисовкой пользовательского интерфейса, то есть побочным эффектом можно считать сохранение данных в локальное хранилище, запрос на сервер и т.д. Все то что не меняет интерфейс на прямую

  // Данный хук принимает два аргумента, это коллбек функция которая будет выполнена, и массив с зависимостями.
  // При изменении какой либо зависимости в массиве, будет вызвана функция, которую мы передали первым аргументом.
  // Если массив с зависимостями будет пустой, то данный хук вызовет функцию только один раз при загрузке приложения

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("isLoggedIn")

    if (storedLoginInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);


  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
