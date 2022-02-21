import React from 'react'
import styles from "./Input.module.css";

const Input = (props) => {
    return (
        <div
            // Так же используем значение из состояния emailState
            className={`${styles.control} ${props.isValid === false ? styles.invalid : ""
                }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
}

export default Input