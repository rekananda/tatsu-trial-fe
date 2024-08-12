import { Box, Stack, Text, Tooltip } from "@mantine/core";
import { ReactNode } from "react";
import Icon from "../Icon";

export const labelprops = (val?: string):Record<string, any> => ({labelElement:val?"div":"label"});

export const LabelValue = (tooltip?:string, label?:ReactNode):ReactNode => {
  if (tooltip) {
    const LabelWrapper = tooltip ? Tooltip:Box;
    return (
      <LabelWrapper label={tooltip} position="top-start" className="flex">
        <Text className="font-label" component="span">{label} <Icon name="IconInfoCircle" size={14} stroke={2}/></Text>
      </LabelWrapper>
    )
  }
  return label;
}


type PropsCustomInputWrapper = {
  label: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  tooltip?: string;
  required?: boolean;
}

export const CustomInputWrapper = (props: PropsCustomInputWrapper):ReactNode => {
  const {label, description, error, tooltip, required, children} = props
  const LabelWrapper = tooltip ? Tooltip:Box;

  return (
    <>
      <LabelWrapper label={tooltip} position="top-start">
        <Stack gap={0}>
          <Text className="font-label">
            {label} 
            {tooltip && <Icon name="IconInfoCircle" size={12} stroke={2}/>} 
            {required && <span className="text-red">*</span>}
          </Text>
          {description && <Text className="p-0 mantine-InputWrapper-description" c="gray">{description}</Text>}
        </Stack>
      </LabelWrapper>
      <Box style={{marginTop: "calc(var(--mantine-spacing-xs) / 2)"}}>
        {children}
      </Box>
      {error && <Text className="p-0 font-body" c="red">{error}</Text>}
    </>
  )
}