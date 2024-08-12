import InfoCard, { InfoCardSkeleton } from '@/Components/Molecule/Content/InfoCard';
import { PropBaseT } from '@/types';
import { CollectionInfoT } from '@/types/magiceden-types';
import { formatNumber, getInitial } from '@/utils/formatting';
import { Avatar, Card, Divider, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';

type PropsCollectionInfoT = {
  data: CollectionInfoT | null;
  loading: boolean
} & PropBaseT;

const CollectionInfo = ({ data, loading }: PropsCollectionInfoT) => {

  if (loading) return <CollectionInfoSkeleton />
  return (
    <Card>
      <Group wrap='nowrap'>
        <Avatar src={data?.image} size={48}>{getInitial(data?.name||"")}</Avatar>
        <Stack gap={8}>
          <Text className='font-title-content' maw="400" lineClamp={1}>{data?.name}</Text>
          <Tooltip label={data?.description}>
            <Text className='font-body' maw="400" lineClamp={1}>{data?.description}</Text>
          </Tooltip>
        </Stack>
        <Divider size="sm" orientation="vertical" />
        <InfoCard label="Floor Price" value={data?.floorPrice || 0} unit="SOL"/>
        <Divider size="sm" orientation="vertical" />
        <InfoCard label="All Vol" value={formatNumber(data?.volumeAll || 0)} tooltip={data?.volumeAll.toString()}/>
        <Divider size="sm" orientation="vertical" />
        <InfoCard 
          label="Listed / Supply" 
          value={`${data?.listedCount}/${data?.totalSupply || "-"}`} 
          unit={`${(((data?.listedCount||0) / (data?.totalSupply||0) )* 100).toFixed(1)}%`} 
        />
        <Divider size="sm" orientation="vertical" />
        <InfoCard 
          label="Owners" 
          value={formatNumber(data?.uniqueHolders || 0)} tooltip={data?.uniqueHolders.toString()}
          unit={`${(((data?.uniqueHolders||0) / (data?.totalSupply||0) )* 100).toFixed(1)}%`} 
        />
      </Group>
    </Card>
  );
};

const CollectionInfoSkeleton = () => {
  return (
    <Card>
      <Group wrap='nowrap'>
        <Skeleton height={48} circle />
        <Stack>
          <Skeleton height={18} width={300}/>
          <Skeleton height={14} width={400}/>
        </Stack>
        <Divider size="sm" orientation="vertical" />
        <InfoCardSkeleton maw={200} label="Floor Price" />
        <Divider size="sm" orientation="vertical" />
        <InfoCardSkeleton maw={200} label="All Vol"/>
        <Divider size="sm" orientation="vertical" />
        <InfoCardSkeleton maw={200} label="Listed / Supply" />
        <Divider size="sm" orientation="vertical" />
        <InfoCardSkeleton maw={200} label="Owners" />
      </Group>
    </Card>
  );
};

export default CollectionInfo;
