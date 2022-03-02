import { styled } from "~/styles/theme";
import { Button } from "~/components/Button/styles";
export const Container = styled.div`
  border: 2px solid ${(props) => props.theme.colors.purple.purple100};
  padding: 16px;
  border-radius: 16px;
  ${Button} {
    min-width: fit-content;
    font-size: 16px;
    padding: 4px 24px;
  }
`;

export const Title = styled.h2``;

export const InputContainer = styled.div`
  display: flex;
  gap: 16px;

`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ContainerSettings = styled.div`
  
  `;
