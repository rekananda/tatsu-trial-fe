
import { PasswordInput, PasswordInputProps, TextInput, TextInputProps } from "@mantine/core";
import { labelprops, LabelValue } from "./index.d";

type PropsInputTextT = {
  label?: string;
  tooltip?: string;
  formtype?: "text" | "email" | "password";
} & TextInputProps

const InputText = (props: PropsInputTextT) => {
  const { 
    formtype = "text", 
    tooltip, 
    label,
    ...rest
  } = props;
  const placeholder = !rest.placeholder ? 
    label ? `Type ${label.toLocaleLowerCase()}`:`Input Value`:
    rest.placeholder;

  return (
    <>
      {formtype == "password" ? 
        <PasswordInput 
          {...rest as PasswordInputProps} 
          label={LabelValue(tooltip, label)} 
          labelProps={labelprops(tooltip)} 
          placeholder={placeholder}
        />:
        <TextInput 
          {...rest} 
          label={LabelValue(tooltip, label)} 
          labelProps={labelprops(tooltip)} 
          type={formtype} 
          placeholder={placeholder}
        />
      }
    </>
  )
}

export default InputText;