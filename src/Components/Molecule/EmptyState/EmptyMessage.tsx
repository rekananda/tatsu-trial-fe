import { PropBaseT } from '@/types';
import { Box, Text, TextProps } from '@mantine/core';

type PropsEmptyMessageT = {
  title?: string;
  subTitle?: string;
  height?: number;
} & PropBaseT &
  TextProps;

const EmptyMessage = (props: PropsEmptyMessageT) => {
  const { height, title, subTitle, children, className, ...rest } = props;
  return (
    <Box className={`flex flex-col justify-center items-center ${className}`} h={height}>
      <Text c="gray" fw={700} fz={30} {...rest}>
        {title || 'Data Kosong'}
      </Text>
      {subTitle && (
        <Text mb="md" c="gray.5" fw={500} fz={12}>
          {subTitle}
        </Text>
      )}
      {children}
    </Box>
  );
};

export default EmptyMessage;
