import { styled } from "~/styles/theme";

export const Input = styled.input`
  height: 42px;
  border-radius: 8px;
  border: ${({ theme }) => `2px solid ${theme.colors.white}`};
  outline: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  padding: 4px 12px;

  ::placeholder {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.span``;

export const ErrorInput = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
