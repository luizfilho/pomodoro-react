import { styled } from "~/styles/theme";

export const Container = styled.div``;

export const Tab = styled.div<{ currentTab?: boolean }>`
  padding: 4px 8px;
  cursor: pointer;
  border-bottom: ${({currentTab, theme}) => currentTab && `2px solid ${theme.colors.white}`};
  min-width: fit-content;
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TabLabel = styled.span`
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
`;

export const TabContent = styled.div`
  margin: 16px 0px;
`;
