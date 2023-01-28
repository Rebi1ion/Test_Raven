import styled from "@emotion/styled";

const OnlineStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #70cc16;
  display: inline-block;
  flex-shrink: 0;
`;

const OfflineStatus = styled(OnlineStatus)`
  background: #666666;
`;

// const checkOnline = (isOnline = false) => {
//   return styled.div`
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     background: ${isOnline ? "#70cc16" : "#666666"};
//     display: inline-block;
//     flex-shrink: 0;
//   `;
// };

const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  &::before,
  &::after {
    content: "";
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(45deg);
    position: absolute;
    width: 100%;
    height: 2px;
    background: darkred;
  }
  &::after {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

const AddButton = styled(CloseButton)`
  transform: rotate(45deg);
`;

const Panel = styled.section`
  padding: 50px;
  flex-grow: 1;
`;

const BackButton = styled.button`
  background: inherit;
  border-bottom: 0.5px solid transparent;
  font-size: 1.25rem;
  margin-bottom: 20px;
  &:hover {
    border-bottom: 0.5px solid #000;
  }
`;

const TitlePanel = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 50px;
`;

const PanelInput = styled.input`
  padding: 0 10px;
  font-size: 1.2rem;
  margin: 10px 0 30px;
  width: 300px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 10px;
  display: block;
`;

const PanelForm = styled.form`
  margin-bottom: 50px;

  label {
    font-size: 0.875rem;
  }
`;

const PanelButton = styled.button`
  background: inherit;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 20px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 30px;
  &:hover {
    background: #efefef;
  }
`;

const Error = styled.div`
  font-size: 0.875rem;
  margin-top: 10px;
  color: red;
`;

export {
  OnlineStatus,
  OfflineStatus,
  CloseButton,
  AddButton,
  Panel,
  BackButton,
  TitlePanel,
  PanelInput,
  PanelForm,
  PanelButton,
  Error,
};
