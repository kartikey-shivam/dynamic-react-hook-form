import React from "react"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import styles from "../../styles/Home.module.css"

interface IFormData {
  formData: {
    [key: string]: {
      label: string
      type: string
      options?: string[]
      placeholder?: string
      defaultValue: string
      rules: {
        required: boolean
        maxLenth?: number
      }
      checkboxLabel?: string
    }
  }
}

export default function Form({ formData }: IFormData) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm()
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
                    {...register(key, {
                      required: value.rules.required,
                      // maxLength: value.rules.maxLength?value.rules.maxLength:null,
                      // ...(value.rules.maxLenth && { maxLength: value.rules.maxLength }),
                    })}
                    defaultValue={value.defaultValue}
                    placeholder={value.placeholder}
                    type="text"
                    className={styles.input}
                    aria-invalid={errors[key] ? "true" : "false"}
                  />
                  {errors[key]?.type === "required" && <p role="alert">{key} is required</p>}
                  {errors[key]?.type === "maxLength" && <p role="alert">{key} is maxLength</p>}
                </div>
              )
            case "radio":
              return value?.options?.map((item) => {
                return (
                  <div className={styles.radio}>
                    <label htmlFor={item}>{item}</label>
                    <input
                      type="radio"
                      value={item}
                      {...register(value.label, { required: value.rules.required })}
                      id={item}
                      className={styles.input}
                    />
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
