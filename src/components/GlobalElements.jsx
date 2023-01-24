import styled from "@emotion/styled";

const checkOnline = (isOnline) => {
  return styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${isOnline ? "#70cc16" : "#666666"};
    display: inline-block;
  `;
};

export { checkOnline };
