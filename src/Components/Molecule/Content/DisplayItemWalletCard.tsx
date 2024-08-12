import { PropBaseT } from '@/types';
import { MagicEdenHolderNFTs } from '@/types/magiceden-types';
import { AspectRatio, Card, CardSection, Group, Image, Skeleton, Text } from '@mantine/core';

type PropsDisplayItemWalletCardT = {
  data: MagicEdenHolderNFTs
} & PropBaseT;

const DisplayItemWalletCard = ({ data }: PropsDisplayItemWalletCardT) => {
  return (
    <Card padding={8} shadow="sm" radius="md" withBorder>
      <CardSection>
        <AspectRatio ratio={1/1}>
          <Image alt={data.name} src={data.image} w="100%" h="100%" fit='cover'/>
        </AspectRatio>
      </CardSection>
      <Text fw={700} lineClamp={1}>{data.name}</Text>
      <Text fz={12} lineClamp={1}>{data.collectionName}</Text>
      {data.price ? <Group mt={8} gap={4}>
        <Text fz={12}>{data.price}</Text>
        <Text fz={12} c="gray">SOL</Text>
      </Group>:<Text fz={12} c="gray">UNLISTED</Text>}
    </Card>
  );
};

export const DisplayItemWalletCardSkeleton = () => {
  return (
    <Card padding={8} shadow="sm" radius="md" withBorder>
      <CardSection>
        <AspectRatio ratio={1/1}>
          <Skeleton h="100%" w="100%" radius={0}/>
        </AspectRatio>
      </CardSection>
      <Skeleton radius={0}/>
      <Skeleton h={12}  radius={0}/>
      <Skeleton h={12}  radius={0}/>
    </Card>
  );
};

export default DisplayItemWalletCard;
