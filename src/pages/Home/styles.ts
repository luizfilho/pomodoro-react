import { styled } from "~/styles/theme";

export const Title = styled.h1`
  margin: 0px;
  color: ${(props) => props.theme.colors.white};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;
  height: 100%;
`;


export const TitlePage = styled.h1`
  margin: 8px;
`;
