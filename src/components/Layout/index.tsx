import { styled } from "~/styles/theme";

interface Props {
  backgroundColor?: string;
}

export const ContainerPage = styled.div<Props>`
  height: 100vh;
  background-color: ${({
    backgroundColor,
    theme: {
      colors: {
        gray: { gray100 },
      },
    },
  }) => backgroundColor || gray100};
  transition: 0.5s all;
`;
