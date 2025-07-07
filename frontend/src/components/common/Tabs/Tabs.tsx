import React from 'react';
import { TabsWrapper, Tab, TabContent } from './tabs.styles';

interface TabProps {
  label: string;
  content: React.ReactNode;
  id: string;
}

interface TabsProps {
  tabs: TabProps[];
  activeTab: number;
  setActiveTab?: (index: number) => void;
  clickable?: boolean;
  style?: object
}

export function TabOptions({ tabs, activeTab, setActiveTab , clickable = true, style }: TabsProps) {
  return (
    <TabsWrapper style={style}>
      <div>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            active={index === activeTab}
            clickable={clickable}
            onClick={() => clickable && setActiveTab && setActiveTab(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
    </TabsWrapper>
  );
}

interface TabContentDisplayProps {
  tabs: TabProps[];
  activeTab: number;
}

export function TabContentDisplay({ tabs, activeTab }: TabContentDisplayProps) {
  return <TabContent>{tabs[activeTab].content}</TabContent>;
}