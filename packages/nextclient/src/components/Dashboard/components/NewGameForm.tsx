import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (input: NewGameInput) => void;
}

interface NewGameInput {
  playername: string,
  boardsize: number
}

export const NewGameForm:React.FC<Props> = ({onSubmit}) => {
  const { handleSubmit, register, errors } = useForm();

  const onHandleSubmit = (values: NewGameInput) => {
    console.log(values);
    onSubmit(values);
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onHandleSubmit)} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="playername">
            Player name
          </label>
          <input
            name="playername"
            ref={register()}
            className={styles.input}
          />
          {errors.email && errors.email.message}
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="boardsize">
            Board size
          </label>
          <input
            name="boardsize"
            ref={register()}
            className={styles.input}
          />
          {errors.email && errors.email.message}
        </div>
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formWrapper: "w-full max-w-xs",
  form: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",
  inputWrapper: "mb-4",
  input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
  label: "block text-gray-700 text-sm font-bold mb-2",
  buttonWrapper: "lex items-center justify-between",
  button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
}