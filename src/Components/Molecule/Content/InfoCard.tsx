import { Group, Skeleton, Stack, StackProps, Text, Tooltip } from '@mantine/core';
import { ReactNode } from 'react';

type PropsInfoCardT = {
  label: ReactNode;
  value: ReactNode;
  tooltip?: string;
  unit?: string;
};

const InfoCard = ({ label, value, unit, tooltip }: PropsInfoCardT) => {
  return (
    <Stack gap={8}>
      <Text size="14" c="gray" lh={1}>{label}</Text>
      <Group gap={4}>
        <Tooltip label={tooltip||""}>
          <Text size='18' lh={1} fw={700}>{value}</Text>
        </Tooltip>
        {unit && <Text size='18' lh={1} c="gray">{unit}</Text>}
      </Group>
    </Stack>
  );
};

type PropsInfoCardSkeletonT = {
  label?: ReactNode;
} & StackProps;

export const InfoCardSkeleton = ({label, ...rest}: PropsInfoCardSkeletonT) => {
  return (
    <Stack gap={8} {...rest}>
      {label ? <Text size="14" c="gray" lh={1}>{label}</Text>: <Skeleton height={14} />}
      <Skeleton height={18}/>
    </Stack>
  );
};

export default InfoCard;
