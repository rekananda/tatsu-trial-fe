import InputCheckbox from '@/Components/Atom/FormInput/InputCheckbox';
import InputText from '@/Components/Atom/FormInput/InputText';
import { FormLoginValidation } from '@/utils/validation';
import { Button, Divider, Group, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

type FormDataT = {
  email: string,
  password: string,
  rememberMe: boolean
}

type PropsLoginFormT = {
  formName?: string,
  handleSubmit: (data: any) => void
}

const LoginForm = ({ formName="login-form", handleSubmit }: PropsLoginFormT) => {
  const form = useForm<FormDataT>({
    mode: 'controlled',
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validateInputOnChange: true,
    validate: zodResolver(FormLoginValidation),
  });

  return (
    <form id={formName} className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <InputText 
          className='w-full'
          label="Email" 
          formtype="email" 
          autoComplete="off"
          key={form.key('email')} 
          {...form.getInputProps('email')}
        />
        <InputText 
          className='w-full'
          label="Password" 
          tooltip="password must contain number and special case"
          formtype="password" 
          autoComplete="off"
          key={form.key('password')} 
          {...form.getInputProps('password')}
        />
        <Group justify='flex-end'>
          <InputCheckbox 
            label="Remember Me" 
            key={form.key('rememberMe')} 
            {...form.getInputProps('rememberMe', {type: "checkbox"})}
          />
        </Group>
        <Divider/>
        <Button type='submit'>Sign In</Button>
      </Stack>
    </form>
  )
}

export default LoginForm;