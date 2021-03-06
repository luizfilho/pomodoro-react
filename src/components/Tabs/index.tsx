import React, { useState, useMemo, useEffect } from "react";
import * as S from "./styles";

interface Props {
  tabs: {
    component: React.ReactNode | null;
    label: string;
    value?: any;
  }[];
  initialTabIndex?: number;
  onChangeTab: (value: any) => void;
}

const Tabs = ({ tabs, initialTabIndex = 0, onChangeTab }: Props) => {
  const [currentTabIndex, setCurrentTabIndex] =
    useState<number>(initialTabIndex);

  const currentComponent = useMemo(
    () => tabs[currentTabIndex].component,
    [currentTabIndex]
  );

  useEffect(() => {
    setCurrentTabIndex(initialTabIndex);
  }, [initialTabIndex]);

  return (
    <S.Container>
      <S.TabsContainer>
        {tabs.map(({ label, value }, index) => (
          <S.Tab
            key={index}
            currentTab={index === currentTabIndex}
            onClick={() => {
              onChangeTab && onChangeTab(value);
            }}
          >
            <S.TabLabel>{label}</S.TabLabel>
          </S.Tab>
        ))}
      </S.TabsContainer>
      {currentComponent && <S.TabContent>{currentComponent}</S.TabContent>}
    </S.Container>
  );
};

export default Tabs;
