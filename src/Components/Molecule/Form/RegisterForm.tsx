import InputText from '@/Components/Atom/FormInput/InputText';
import { FormRegisterValidation } from '@/utils/validation';
import { Button, Divider, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

type FormDataT = {
  name: string,
  email: string,
  password: string,
  confirmationPassword: string,
}

type PropsRegisterFormT = {
  formName?: string,
  handleSubmit: (data: any) => void
}

const RegisterForm = ({ formName="register-form", handleSubmit }: PropsRegisterFormT) => {
  const form = useForm<FormDataT>({
    mode: 'controlled',
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmationPassword: ""
    },
    validateInputOnChange: true,
    validate: zodResolver(FormRegisterValidation),
  });

  return (
    <form id={formName} className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <InputText 
          className='w-full'
          label="Name" 
          required
          autoComplete="off"
          key={form.key('name')} 
          {...form.getInputProps('name')}
        />
        <InputText 
          className='w-full'
          label="Email" 
          required
          formtype="email" 
          autoComplete="off"
          key={form.key('email')} 
          {...form.getInputProps('email')}
        />
        <InputText 
          required
          className='w-full'
          label="Password" 
          tooltip="password must contain number and special case"
          formtype="password" 
          autoComplete="off"
          key={form.key('password')} 
          {...form.getInputProps('password')}
        />
        <InputText 
          required
          className='w-full'
          label="Re-Type Password" 
          tooltip="must same as password"
          formtype="password" 
          autoComplete="off"
          key={form.key('confirmationPassword')} 
          {...form.getInputProps('confirmationPassword')}
        />
        <Divider/>
        <Button type='submit'>Sign Up</Button>
      </Stack>
    </form>
  )
}

export default RegisterForm;