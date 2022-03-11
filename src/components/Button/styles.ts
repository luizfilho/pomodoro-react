import { styled } from "~/styles/theme";

export const Container = styled.div``;

export const Button = styled.button`
  min-width: 240px;
  min-height: 50px;
  outline: none;
  text-transform: uppercase;
  background-color: transparent;
  border: ${({ theme }) => `2px solid ${theme.colors.white}`};
  color: ${(props) => props.theme.colors.white};
  font-size: 24px;
  border-radius: 4px;
  margin: 16px;
  font-family: "Nunito";
  letter-spacing: 4px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;

  :hover {
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black.main};
    transform: translateY(-4px);
  }

  :disabled {
    cursor: not-allowed;
  }
`;
