import styled from "@emotion/styled";

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

export default PanelButton;
