import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

// Данная функция будет передаваться в хук useReducer
// В функцию передается состояние и action автоматически
// И данная функция должна возвращать состояние 

// Теперь мы можем обработать данные внутри этой функции
const emailReducer = (prevState, action) => {
  // В данном случае, если у action есть поле type, и оно равно свойству USER_INPUT
  // То будем возвращать объект с обновленными данными
  if (action.type === "USER_INPUT") {
    return {
      // Записываем данные из action и его поля value
      value: action.value,
      // И проверяем, есть ли символ @ в значении
      isValid: action.value.includes("@"),
    };
  }

  // В данном случае если у action тип будет равен INPUT_BLUR, то будет возвращен объект
  // Где передаем предыдущее состояние, и проверяем это предыдущее состояние
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }
  // В данном случае будет возвращаться объект с полями
  return {
    value: "",
    isValid: false
  };
};


const passwordReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 7,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 7,
    };
  }

  return {
    value: "",
    isValid: false
  };
}

const Login = (props) => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [inputPassword, setInputPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Хук useReducer возвращает массив из двух значений
  // Первое значение это состояние
  // Второе значение это функция для обновления состояния. В хуке useState, такая функция просто обновляет состояние. А в хуке useReducers данная функция работает немного по другому. 
  // В хуке useReducers, данная функция отправляет некоторое действие, action 
  // Данный action будет передан в функцию, которую мы передаем первым параметром в хук useReducer, то есть в данном случае в функцию emailReducer

  // В данном случае, функция emailReducer получает самое последнее состояние, автоматически
  // И вторым параметром принимает действие, action
  // React будет вызывать эту функцию каждый раз, когда будет отправлено действие, action
  // (prevState, action) => {newState} Такого типа функция передается первым параметров в хук useReducer
  // И затем данная функция должна вернуть обновленное состояние

  // Так же можно установить какое либо первоначальное состояние { value: "", isValid: false }, оно будет установлено в состояние emailState

  // Таким образом мы объединили два состояния в одно
  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: "", isValid: false });


  // Создаем хук useReducer, где с помощью деструтуризации объявляем переменные
  // Переменная с состоянием
  // Переменная с функцией, для редактирования состояния
  // Хук принимает несколько параметров, коллбек функция и состояние по умолчанию
  // Коллбек функция, reducer, принимает в аргумент предыдущее состояние и некоторый action
  // В зависимости от action, определяем состояние, и возвращаем новое состояние
  // Состояние записывается в переменную состояния
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: "", isValid: false });

  {
    // Использование хука - В данном случае функция переданная в хук будет вызываться каждый раз, когда значения в массиве зависимостей будет меняться

    // К примеру при вводе данных в input, срабатывает событие onChange, данные заносятся в переменные, так как переменные были обновлены, то есть сработал побочный эффект, то теперь сработает функция переданная в useEffect

    // При вводе символов, будет срабатывать хук, и будет запуск таймера на каждый ввод символа, для предотвращения множественного вызова таймера, используем функцию очистки.
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     console.log("Effect function");
    //     setFormIsValid(
    //       inputEmail.includes("@") && inputPassword.trim().length > 7
    //     );
    //   }, 3000);

    // Функция очистки - данная функция будет проводить очистку таймера до того как будет запущен внутренний таймер.
    // В первый раз функция очистки не запускается

    // То есть мы открыли приложение, функция в хуке сработает один раз, но функция очистки не сработает
    // Затем при вводе символа, мы меняем данные в зависимостях, и идет запуск функции хука
    // Тут идет вызов функцию хука, срабатывает сначала функция очистки таймера, затем уже срабатывает таймер
    // Так как мы вводим много символов, предыдущие таймеры будут очищены, после того как мы прекратим ввод символов, будет вызвана функция с таймером, тем самым мы очистили предыдущие таймеры и оставили последний

    //   return () => {
    //     console.log("Очистка");
    //     clearTimeout(timer)
    //   }
    // }, [inputEmail, inputPassword]);
  }

  // С помощью деструктуризации создаем переменные, где хранятся значения
  // С помощью alias свойствам полученным из состояния, даем названия
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Effect function");
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 3000);

    return () => {
      console.log("Очистка");
      clearTimeout(timer)
    }
  }, [emailIsValid, passwordIsValid]);



  const emailChangeHandler = (event) => {
    // setInputEmail(event.target.value);
    // Когда мы хотим обновить значение, то отправляем action
    // Данный объект является action, { type: "USER_INPUT", value: event.target.value }
    // У объекта есть свойство type, которое описывает что происходит
    // value, поле которое содержит данные которые ввел пользователь

    // Затем эта функция dispatchEmailState, запустит функцию emailReducer, так как функцию emailReducer мы передали в хук useReducer

    // При передаче action в функцию dispatchEmailState, мы тем самым вызываем функцию reducer, emailReducer
    dispatchEmailState({ type: "USER_INPUT", value: event.target.value })

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setInputPassword(event.target.value);
    dispatchPasswordState({ type: "USER_INPUT", value: event.target.value })

    // В данном случае мы проверяем пароль и поле isValid в состоянии emailState, если все условия true, то кнопка будет разблокированна
    // setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    // В данном случае мы можем обращаться к состоянию и к его полю
    // setEmailIsValid(emailState.isValid);


    dispatchEmailState({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(inputPassword.trim().length > 6);
    dispatchPasswordState({ type: "INPUT_BLUR" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // В данном случае мы отправляем значение из поля value, из состояния emailState
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          // Так же используем значение из состояния emailState
          className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${passwordState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
