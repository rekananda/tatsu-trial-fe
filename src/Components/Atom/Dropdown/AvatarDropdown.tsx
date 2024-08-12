import { Group, Menu, MenuDropdown, MenuItem, MenuTarget, useMantineColorScheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import UserAvatar, { AvatarDataT } from "../Avatar/UserAvatar";
import Icon from "../Icon";

type PropsAvatarDropdown = {
  data: AvatarDataT,
  handleLogout: () => void
}

const AvatarDropdown = (props: PropsAvatarDropdown) => {
  const { data, handleLogout } = props;
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  return (
    <Menu offset={5} openDelay={100} closeDelay={400} position="bottom-end">
      <MenuTarget>
        <Group grow preventGrowOverflow={false} wrap="nowrap" gap={8}>
          <UserAvatar className="avatar-dropdown" visibleFrom="lg" color={colorScheme === "dark"? "white":"dark"} size={38} data={data} />
          <UserAvatar className="avatar-dropdown" hiddenFrom="lg" color={colorScheme === "dark"? "white":"dark"} size={28} data={data} withText={false}/>
        </Group>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem className={colorScheme === "dark"? "hover:bg-gray-8":"hover:bg-gray-3"} leftSection={<Icon name="IconWallet"/>} onClick={() => navigate("/wallet")}>
          My Wallet
        </MenuItem>
        <MenuItem className={colorScheme === "dark"? "hover:bg-gray-8":"hover:bg-gray-3"} leftSection={<Icon name="IconLogout"/>} onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  )
}

export default AvatarDropdown;