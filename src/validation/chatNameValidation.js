import * as yup from "yup"

export const chatSchema = yup.object().shape({
  chatName: yup
    .string()
    .min(4, "Минимальное кол-во символов 4")
    .max(15, "Максимальное кол-во символов 15")
    .required("Поле обязательно к заполнению"),
});