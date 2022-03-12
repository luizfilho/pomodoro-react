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
  margin: auto;
  height: 100%;
  width: 90%;


  @media ${(props) => props.theme.breakpoints.xs} {
    width: 90%;
  }
  
`;

export const TitlePage = styled.h1`
  margin: 8px;
`;
