import { PropBaseT } from '@/types';
import { MagicEdenCollectionListing } from '@/types/magiceden-types';
import { AspectRatio, Card, CardSection, Group, Image, Skeleton, Text } from '@mantine/core';

type PropsDisplayItemCardT = {
  data: MagicEdenCollectionListing
} & PropBaseT;

const DisplayItemCard = ({ data }: PropsDisplayItemCardT) => {
  return (
    <Card padding={8} shadow="sm" radius="md" withBorder>
      <CardSection>
        <AspectRatio ratio={1/1}>
          <Image alt={data.token.name} src={data.token.image} w="100%" h="100%" fit='cover'/>
        </AspectRatio>
      </CardSection>
      <Group mt={8} gap={4}>
        <Text fz={12}>{data.price}</Text>
        <Text fz={12} c="gray">SOL</Text>
      </Group>
    </Card>
  );
};

export const DisplayItemCardSkeleton = () => {
  return (
    <Card padding={8} shadow="sm" radius="md" withBorder>
      <CardSection>
        <AspectRatio ratio={1/1}>
          <Skeleton h="100%" w="100%" radius={0}/>
        </AspectRatio>
      </CardSection>
      <Group justify="space-between" mt={8}>
        <Skeleton h={12}  radius={0}/>
      </Group>
    </Card>
  );
};

export default DisplayItemCard;
