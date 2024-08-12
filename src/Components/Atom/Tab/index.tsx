import { Box, Tabs, TabsPanelProps, TabsProps } from '@mantine/core';
import { ReactNode, useState } from 'react';

export type TabT = {
  value: string;
  label: ReactNode;
};

type PropsTabT = {
  tabList: TabT[];
  activeTab: string | null;
  listenActiveTab?: (value: string | null) => void;
  isGrow?: boolean;
  withSpaces?: boolean;
  leftActionSection?: ReactNode;
  rightActionSection?: ReactNode;
} & TabsProps;

const Tab = (props: PropsTabT) => {
  const { activeTab, listenActiveTab, tabList, isGrow, withSpaces = true, children, leftActionSection, rightActionSection, ...rest } = props;

  const [selectedTab, setTab] = useState<string | null>(activeTab || tabList[0]?.value);

  listenActiveTab && listenActiveTab(selectedTab);

  const handleTabChange = (tab: string | null) => {
    listenActiveTab && listenActiveTab(tab);
    setTab(tab);
  };

  return (
    <Tabs color="primary" {...rest} value={selectedTab} onChange={handleTabChange}>
      <Box className={rightActionSection ? `flex flex-col md:flex-row ${withSpaces ? 'justify-between ' : ''} gap-4` : 'flex gap-4'}>
        <Box className={`flex gap-4 ${withSpaces ? 'flex-grow' : ''}`}>
          {leftActionSection}
          <Tabs.List className="flex-grow" grow={isGrow}>
            {tabList.map((item, index) => {
              return (
                <Tabs.Tab key={`tabslist-${index}`} value={item.value} className="font-button">
                  {item.label}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Box>
        {rightActionSection}
      </Box>
      {children}
    </Tabs>
  );
};

export const TabItem = ({ children, ...rest }: TabsPanelProps) => {
  return <Tabs.Panel {...rest}>{children}</Tabs.Panel>;
};

export default Tab;
