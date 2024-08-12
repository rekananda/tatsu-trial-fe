import { ActionIcon, ActionIconProps, useMantineColorScheme } from '@mantine/core';
import { useColorScheme, useToggle } from '@mantine/hooks';
import { useEffect } from 'react';
import Icon from '../Icon';

const ColorSchemeToggler = (props: ActionIconProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useColorScheme();
  const [value, toggle] = useToggle(['light', 'dark'] as const);

  useEffect(() => {
    toggle(colorScheme);
  },[])

  useEffect(() => {
    setColorScheme(value)
  },[value])

  return (
    <ActionIcon variant='subtle' size={28} {...props} onClick={() => toggle()}>
      <Icon name={value === "dark" ? "IconSun":"IconMoon"} size={20}/>
    </ActionIcon>
  )
}

export default ColorSchemeToggler;