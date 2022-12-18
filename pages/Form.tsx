import React from "react"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import styles from "../styles/Home.module.css"

interface IFormData {
  [key: string]: {
    label: string
    type: string
    options?: string[]
    placeholder?: string
    defaultValue: string
    rules: {
      required: boolean
    }
    checkboxLabel?: string
  }
}
const formData: IFormData = {
  firstName: {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  lastName: {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  gender: {
    label: "Gender",
    type: "radio",
    options: ["male", "female"],
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  profession: {
    label: "Profession",
    type: "dropdown",
    options: ["Front-end Developer", "Back-end Developer", "Devops Engineer"],
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  agree: {
    type: "checkbox",
    label: "Agree",
    checkboxLabel: "I hereby agree to the terms.",
    defaultValue: "false",
    rules: {
      required: true,
    },
  },
}
export default function Form() {
  const { register, control, handleSubmit } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(console.log)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
        className={styles.container}
      >
        {Object.entries(formData).map(([key, value]) => {
          switch (formData[key].type) {
            case "text":
              return (
                <div className={styles.text}>
                  <label htmlFor={key} className={styles.label}>
                    {value.placeholder}
                  </label>
                  <input
                    {...register(key)}
                    defaultValue={value.defaultValue}
                    placeholder={value.placeholder}
                    type="text"
                    className={styles.input}
                  />
                </div>
              )
            case "radio":
              return value?.options?.map((item) => {
                return (
                  <div className={styles.radio}>
                    <input
                      type="radio"
                      value={item}
                      {...register(value.label)}
                      id={item}
                      className={styles.input}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                )
              })
            case "dropdown":
              return (
                <div className={styles.dropdown}>
                  <label htmlFor={value.label}>{value.label}</label>

                  <select id={key} {...register(key)}>
                    {value?.options?.map((item) => {
                      return <option value={item}>{item}</option>
                    })}
                  </select>
                </div>
              )
            case "checkbox":
              return (
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id={key}
                    {...register(value.label)}
                    className={styles.input}
                  />
                  <label htmlFor={value.label}>{value.checkboxLabel}</label>
                </div>
              )
            default:
              return <p>default</p>
          }
        })}
        <input type="submit" className={styles.input} />
      </form>
    </>
  )
}
