import React, { useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { chatSchema } from "../validation/chatNameValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

import BackButton from "./GlobalComponents/BackButton";
import Panel from "./GlobalComponents/Panel";
import TitlePanel from "./GlobalComponents/TitlePanel";
import PanelInput from "./GlobalComponents/PanelInput";
import PanelForm from "./GlobalComponents/PanelForm";
import PanelButton from "./GlobalComponents/PanelButton";
import Error from "./GlobalComponents/Error";
import { ChatService } from "../app/services/chat.service";

export default function AddChatPanel() {
  const addForm = useRef();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { userId } = useLocation().state || { userId: 3 };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(chatSchema) });

  const { mutate: mutateNewChat } = useMutation(["add new chat"], (chatData) =>
    ChatService.addNewChat(chatData)
  );

  const randomColor = useCallback(() => {
    let result = [];
    for (let i = 0; i <= 2; i++) result.push(Math.floor(Math.random() * 255));
    return `rgb(${result})`;
  }, []);

  const addNewChannel = useCallback(
    ({ chatName }) => {
      console.log(chatName);
      const chatNameInput = addForm.current.querySelector("[name='chatName']");
      chatNameInput.value = "";
      mutateNewChat({
        chatName: chatName,
        bgColor: randomColor(),
        adminUser: userId,
        users: [userId],
      });
      window.location.reload();
    },
    [randomColor, mutateNewChat, userId]
  );

  return (
    <Panel>
      <BackButton onClick={goBack}>← Назад</BackButton>
      <TitlePanel>Создание чата</TitlePanel>
      <PanelForm ref={addForm} onSubmit={handleSubmit(addNewChannel)}>
        <label>
          Название чата*
          <PanelInput
            {...register("chatName")}
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
