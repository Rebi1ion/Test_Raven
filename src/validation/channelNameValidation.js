import * as yup from "yup";

export const channelSchema = yup.object().shape({
  channelName: yup
    .string()
    .min(5, "Минимальное кол-во символов 5")
    .max(25, "Максимальное кол-во символов 25")
    .required("Поле обязательно к заполнению"),
  
});
