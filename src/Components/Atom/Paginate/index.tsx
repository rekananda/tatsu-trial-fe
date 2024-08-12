import { Group, Pagination, PaginationProps, Text } from '@mantine/core';

type PaginateProp = {
  type?: 'default' | 'lite';
} & PaginationProps;

const Paginate = (props: PaginateProp) => {
  const { type = 'default', value = 1, total, ...rest } = props;
  return (
    <Pagination.Root {...rest} total={total} value={value}>
      {type === 'default' && (
        <Group gap={5} justify="center">
          {value > 6 && total > 6 && <Pagination.First />}
          {value > 2 && <Pagination.Previous />}
          <Pagination.Items />
          {value < total - 1 && <Pagination.Next />}
          {value < total - 5 && <Pagination.Last />}
        </Group>
      )}
      {type === 'lite' && (
        <Group gap={5} justify="center">
          {value > 1 && <Pagination.Previous />}
          <Text>
            {value} of {total}
          </Text>
          {value < total && <Pagination.Next />}
        </Group>
      )}
    </Pagination.Root>
  );
};

export default Paginate;
