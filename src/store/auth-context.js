import React, { useEffect, useState } from "react";

// Context - это технология состояния. При разработке приложения, растет количество компонентов. Для передачи данных мы используем props, мы можем передавать данные в верх-низ и низ-верх, данные проходят по цепочке компонентов, и проходят через те кмпоненты, где эти данные могут и не использоваться, это создает некоторые сложности при переброске данных от компонента к компоненту. Для того что бы облегчить передачу данных, создали контекст. 

// Контекст позволяет передать данные от одного компонента в другой, напрямую. Контекст это некоторое глобальное состояние.

// Вызов метода создания контекста, из объекта React
// Создание объекта контекста
// Передаем состояние в аргумент, обычно это объект

// Этот метод возвращает объект, в котором хранятся компоненты
// Для предоставления доступа к контексту, мы должны обернуть в jsx код нужные компоненты, которые должны иметь доступ к контексту
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginInfo = localStorage.getItem("isLoggedIn");

        if (storedLoginInfo === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;