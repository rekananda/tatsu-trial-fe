import Icon from '@/Components/Atom/Icon';
import { PropBaseT } from '@/types';
import { WalletInfoT } from '@/types/magiceden-types';
import { getInitial } from '@/utils/formatting';
import { ActionIcon, Avatar, Card, CopyButton, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';

type PropsWalletInfoT = {
  data: WalletInfoT | null;
  loading: boolean
} & PropBaseT;

const WalletInfo = ({ data, loading }: PropsWalletInfoT) => {

  if (loading) return <WalletInfoSkeleton />
  return (
    <Card>
      <Group wrap='nowrap'>
        <Avatar src={data?.avatar} size={48}>{getInitial(data?.displayName||data?.name||"")}</Avatar>
        <Stack gap={8}>
          <Text className='font-title-content' maw="400" lineClamp={1}>{data?.displayName||data?.name||""}</Text>
          <Group>
            <CopyButton value={data?.address||""}>
              {({ copied, copy }) => (
                <ActionIcon p={4} color={copied ? 'teal' : 'blue'} onClick={copy} size={'sm'}>
                  <Icon name={copied ? 'IconCopyCheck' : 'IconCopy'}/>
                </ActionIcon>
              )}
            </CopyButton>
            <Tooltip label={`${data?.address}`}>
              <Text className='font-body' maw="400" lineClamp={1}>{`${data?.address}`}</Text>
            </Tooltip>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

const WalletInfoSkeleton = () => {
  return (
    <Card>
      <Group wrap='nowrap'>
        <Skeleton height={48} circle />
        <Stack>
          <Skeleton height={18} width={300}/>
          <Skeleton height={14} width={400}/>
        </Stack>
      </Group>
    </Card>
  );
};

export default WalletInfo;
