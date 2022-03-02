import { styled } from "~/styles/theme";

export const Container = styled.div``;

export const Tab = styled.div<{ currentTab?: boolean }>`
  border: 1px solid ${(props) => props.theme.colors.purple.purple300};
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) =>
    props.currentTab && props.theme.colors.purple.purple100};
    min-width:fit-content;
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
