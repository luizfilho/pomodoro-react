import { styled } from "~/styles/theme";

export const Timer = styled.div``;

export const Container = styled.div`
  padding: 42px;
  border-radius: 16px;
  width: auto;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  position:relative;
  flex-direction:column;
  background-color:rgba(255, 255, 255, 0.1);
`;

export const Time = styled.span`
  font-size: 120px;
  color: ${(props) => props.theme.colors.white};
`;
