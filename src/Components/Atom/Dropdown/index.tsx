import { Menu, MenuDropdown, MenuProps, MenuTarget } from "@mantine/core";
import { ReactNode } from "react";

export type PropsDropdownT = {
  menus: ReactNode[];
} & MenuProps

const Dropdown = (props: PropsDropdownT) => {
  const { menus, children, ...rest } = props;

  return (
    <Menu {...rest}>
      <MenuTarget>
        {children}
      </MenuTarget>
      <MenuDropdown>
        {menus.map((menu) => menu)}
      </MenuDropdown>
    </Menu>
  )
}

export default Dropdown;