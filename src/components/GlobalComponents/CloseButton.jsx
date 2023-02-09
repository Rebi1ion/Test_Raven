import styled from "@emotion/styled";

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

export default CloseButton