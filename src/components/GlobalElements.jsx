import styled from "@emotion/styled";

const OnlineStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #70cc16;
  display: inline-block;
`;

const OfflineStatus = styled(OnlineStatus)`
  background: #666666;
`;

export { OnlineStatus, OfflineStatus };
