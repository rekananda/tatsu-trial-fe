import LoginForm from '@/Components/Molecule/Form/LoginForm';
import RegisterForm from '@/Components/Molecule/Form/RegisterForm';
import useAPI from '@/hooks/useAPI';
import useCookies from '@/hooks/useCookies';
import MainLayout from '@/Layout';
import { AuthenticatedDataT } from '@/types/datas';
import toastAlert from '@/utils/toastAlert';
import { Card, Group, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const navigate = useNavigate();
  const [isRegister, { toggle }] = useDisclosure(false);
  const { setValue: setToken } = useCookies("token");
  const { setValue: setDataUser } = useCookies("loggedUser");
  const {data: resLogin, loading: loginLoading, POST: Login} = useAPI<AuthenticatedDataT>("auth/login");
  const {data: resRegister, loading: loginRegister, POST: Register} = useAPI<AuthenticatedDataT>("auth/register");

  useEffect(() => {
    const data = resLogin || resRegister;
    if (data !== null) {
      setToken(data.access_token);
      setDataUser(JSON.stringify(data.user));
      navigate('/');
      toastAlert(isRegister?"User registered!":"Logged In","success")
    }
  },[resLogin, resRegister])

  return (
    <MainLayout>
      <Card miw={"30vw"}>
        <LoadingOverlay visible={loginLoading||loginRegister}/>
        <Stack>
          <Stack gap={2}>
            <Text className='font-heading'>{isRegister? "Sign Up":"Sign In"}</Text>
            <Group>
              <Text className='font-subheading'>{isRegister? "Already have an account?":"Not registered yet?"}</Text>
              <Text className='font-subheading hover:text-primary' onClick={toggle} td="underline" style={{cursor: "pointer"}}>{isRegister? "Sign In":"Sign Up"}</Text>
            </Group>
          </Stack>
          {isRegister ? 
            <RegisterForm handleSubmit={(data) => Register(data)}/>:
            <LoginForm handleSubmit={(data) => Login(data)}/>
          }
        </Stack>
      </Card>
    </MainLayout>
  );
}

export default AuthPage;
