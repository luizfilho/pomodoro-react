import React, { useState, useMemo, useCallback, useEffect } from "react";
import * as S from "./styles";

interface Props {
  tabs: {
    component: React.ReactNode | null;
    label: string;
  }[];
  initialTabIndex?: number;
}

const Tabs = ({ tabs, initialTabIndex = 0 }: Props) => {
  const [currentTabIndex, setCurrentTabIndex] =
    useState<number>(initialTabIndex);
  const currentComponent = useMemo(
    () => tabs[currentTabIndex].component,
    [currentTabIndex]
  );

  const handleCurrentTabIndex = useCallback((newTabIndex: number) => {
    setCurrentTabIndex(newTabIndex);
  }, []);
  useEffect(() => {
    handleCurrentTabIndex(initialTabIndex);
  }, [initialTabIndex]);

  return (
    <S.Container>
      <S.TabsContainer>
        {tabs.map(({ label }, index) => (
          <S.Tab
            key={index}
            currentTab={index === currentTabIndex}
            onClick={() => handleCurrentTabIndex(index)}
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
