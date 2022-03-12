import { styled } from "~/styles/theme";
import { Button } from "~/components/Button/styles";
export const Container = styled.div`
  padding: 24px;
  border-radius: 16px;
  ${Button} {
    min-width: fit-content;
    font-size: 16px;
    padding: 4px 24px;
  }
  background-color: rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h2``;

export const InputContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${Button} {
    min-width: auto;
    margin: 16px 0px;
  }
`;

export const ContainerSettings = styled.div``;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0px;
  justify-content: space-between;
`;
export const SwitchLabel = styled.h4`
  margin: 0;
`;
