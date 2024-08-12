import ColorSchemeToggler from '@/Components/Atom/Content/ColorSchemeToggler';
import AvatarDropdown from '@/Components/Atom/Dropdown/AvatarDropdown';
import useCookies from '@/hooks/useCookies';
import { PropBaseT } from '@/types';
import { UserDataT } from '@/types/datas';
import toastAlert from '@/utils/toastAlert';
import { Anchor, AppShell, AppShellHeader, AppShellMain, Button, Group } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { completeNavigationProgress, startNavigationProgress } from '@mantine/nprogress';
import { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type PropsMainLayoutT = {
  title?: string;
  fullContent?:boolean;
} & PropBaseT

const MainLayout = (props: PropsMainLayoutT) => {
  const { title, children, fullContent } = props;
  useDocumentTitle(`Meekolony Collection${title?" - "+title:""}`);
  const navigate = useNavigate();
  const location = useLocation();
  const { value, removeValue: removeToken } = useCookies("token");
  const { value: loggedUser, removeValue: removeDataUser } = useCookies("loggedUser");
  const dataUser:UserDataT = useMemo(() => {return JSON.parse(loggedUser||"{}")}, [loggedUser])

  useEffect(() => {
    startNavigationProgress();
    completeNavigationProgress();
  }, [location]);

  const handleLogout = () => {
    removeToken();
    removeDataUser();
    toastAlert("User logged out","success");
    if (location.pathname === "/wallet") navigate('/')
  }

  return (
    <AppShell
      className="relative"
      header={{ height: { base: 64, md: 64, lg: 80 } }}
      p={fullContent? 0:{ base: 16, md: 32, lg: 50 }}
    >
      <AppShellHeader
        className='glassmorp'
        px={{ base: 16, md: 32, lg: 50 }} 
        py={{ base: 16, md: 8, lg: 24 }}
      >
        <Group h="100%" p={0} wrap='nowrap'>
          <Group className="flex-grow font-body" justify='space-between' wrap='nowrap'>
            <Anchor className='font-heading' c={"primary"} href='/'>Meekolony Eden</Anchor>
            <Group gap={12} wrap='nowrap'>
              <ColorSchemeToggler className='button-header' radius="xl" />
              {location.pathname !== "/auth" && !value && <Button onClick={() => navigate("/auth")}>Login</Button>}
              {value && <AvatarDropdown data={{
                alt: dataUser.name,
                title: dataUser.name
              }} handleLogout={handleLogout}/>}
            </Group>
          </Group>
        </Group>
      </AppShellHeader>
      <AppShellMain className={`${location.pathname === "/auth" ? "flex flex-col sm:justify-center items-center relative":''}`}> 
        {children}
      </AppShellMain>
    </AppShell>
  )
}

export default MainLayout;