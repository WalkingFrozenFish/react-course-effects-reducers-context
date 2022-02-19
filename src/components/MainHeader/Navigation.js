import React, { useContext } from "react";
import AuthContext from "../../store/auth-context.js";
import styles from "./Navigation.module.css";

// const Navigation = (props) => {
//   // Для использования контекста, мы обращаемся к компоненту AuthContext и его методу Consumer (Потребитель)
//   return (<AuthContext.Consumer>
//     {/* Внутри компонента объявляем функцию, которая автоматически принимает объект контекста, и возвращает код jsx. И уже внутри этого jsx кода мы можем обращаться к данным в контексте */}
//     {(ctx) => {
//       return (
//         <nav className={styles.nav}>
//           <ul>
//             {ctx.isLoggedIn && (
//               <li>
//                 <a href="/">Пользователи</a>
//               </li>
//             )}
//             {ctx.isLoggedIn && (
//               <li>
//                 <a href="/">Админ</a>
//               </li>
//             )}
//             {ctx.isLoggedIn && (
//               <li>
//                 <button onClick={props.onLogout}>Выйти</button>
//               </li>
//             )}
//           </ul>
//         </nav>
//       )
//     }}
//   </AuthContext.Consumer>)
// }

// Так же можно использовать специальный хук useContext
const Navigation = (props) => {
  // В аргумент хука передаем сам контекст, и обращаемся к нему
  const ctx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Пользователи</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Админ</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Выйти</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation;
