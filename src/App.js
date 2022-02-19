import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context.js";

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
      {/* Метод Provider у AuthContext позволит использовать компонент. Обернув в этот компонент все дочерние компоненты, мы сделали так что все дочерние компоненты имеют доступ к контексту AuthContext */}
      {/* Мы предоставили контекст тем компонентам, которые мы обернули в AuthContext.Provider */}
      {/* Затем мы должны прослушивать этот контекст */}

      {/* Передавая объект, мы сразу передаем обновляемое значение, и можем уже не передавать props с этими данными, так как через контекст передали данные напрямую */}
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn
      }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
