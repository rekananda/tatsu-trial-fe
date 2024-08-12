import { OptionDataT } from '@/types';
import { Box, Checkbox, CheckboxCard, CheckboxGroup, CheckboxGroupProps, CheckboxIndicator, CheckboxProps, Grid, GridCol, GridProps, Group, Stack, Text, Tooltip } from '@mantine/core';
import classes from './checkboxCard.module.css';
import { labelprops, LabelValue } from './index.d';

type PropsInputCheckbox = {
  tooltip?: string;
} & CheckboxProps

const InputCheckbox = (props: PropsInputCheckbox) => {
  const { tooltip, ...rest } = props;
  const LabelWrapper = tooltip ? Tooltip:Box;
  return (
    <LabelWrapper label="Checkbox with tooltip" {...(tooltip ?{refProp:"rootRef"}:{})} position='top-start'>
      <Checkbox {...rest} />
    </LabelWrapper>
  )
}

type PropsInputCheckboxGroup = {
  data: OptionDataT[];
  usingCard?: boolean;
  tooltip?: string;
  dataProps?: GridProps
} & Omit<CheckboxGroupProps, 'children'>

export const InputCheckboxGroup = (props: PropsInputCheckboxGroup) => {
  const { usingCard, tooltip, label, data, dataProps, ...rest } = props;
  const LabelWrapper = tooltip ? Tooltip:Box;

  const cards = (item: OptionDataT) => (
    <CheckboxCard className={classes.root} radius="md" value={item.value} key={item.value}>
      <Group wrap="nowrap" align="flex-start">
        <CheckboxIndicator />
        <LabelWrapper label="tooltip" position='top-start'>
          <Stack gap={4}>
            <Text className={classes.label}>{item.value}</Text>
            {item.description && <Text className={classes.description}>{item.description}</Text>}
          </Stack>
        </LabelWrapper>
      </Group>
    </CheckboxCard>
  );

  return (
    <CheckboxGroup 
      {...rest}
      label={LabelValue(tooltip, label)}
      labelProps={labelprops(tooltip)}
    >
      <Grid columns={4} {...dataProps} style={{marginTop: "calc(var(--mantine-spacing-xs) / 2)"}}>
        {data.map((option, i) => 
          <GridCol key={i} span={1}>
            {usingCard ? cards(option):<InputCheckbox {...option}/>}
          </GridCol>
        )}
      </Grid>
    </CheckboxGroup>
  )
}

export default InputCheckbox;