import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import users from "../states/userState";
import { useForm } from "react-hook-form";
import {
  BackButton,
  Panel,
  TitlePanel,
  PanelInput,
  PanelForm,
  PanelButton,
  Error,
} from "./GlobalElements";

export default function AddChatPanel() {
  const addForm = useRef();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const allChats = useSelector((state) => state.chatUsers);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();

  const randomColor = () => {
    let result = [];
    for (let i = 0; i <= 2; i++) result.push(Math.floor(Math.random() * 255));
    return `rgb(${result})`;
  };
  const addNewChannel = ({ chatName }) => {
    const chatNameInput = addForm.current.querySelector("[name='chatName']");
    chatNameInput.value = "";
    dispatch({
      type: "ADD_CHANNEL",
      payload: {
        chatName: chatName,
        users: [users[3]],
        selected: false,
        isFavorite: false,
        isAdmin: true,
        bgColor: randomColor(),
      },
    });
    dispatch({
      type: "NEW_CHAT",
      payload: { chatId: allChats.length },
    });
  };

  return (
    <Panel>
      <BackButton onClick={goBack}>← Назад</BackButton>
      <TitlePanel>Создание чата</TitlePanel>
      <PanelForm ref={addForm} onSubmit={handleSubmit(addNewChannel)}>
        <label>
          Название чата*
          <PanelInput
            {...register("chatName", {
              required: "Это поле обязательно для ввода",
              minLength: {
                message: "Минимальное количество символов 5",
                value: 5,
              },
              maxLength: {
                message: "Максимальное количество символов 25",
                value: 25,
              },
            })}
            placeholder="Введите название"
          ></PanelInput>
        </label>
        <PanelButton submit="true">Создать</PanelButton>
        <Error>
          {errors?.chatName && <p>{errors?.chatName?.message || "Error"}</p>}
        </Error>
      </PanelForm>
    </Panel>
  );
}
