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

export const ContainerTabs = styled.div`
  margin: 16px 0px;
`;

export const ContainerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0px;

  
`;

export const TitlePage = styled.h1`
  margin: 8px;
`;
export const TextMode = styled.h2`
  margin: 8px;
  font-size: 16px;
  font-weight: normal;
`;
