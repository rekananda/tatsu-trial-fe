import DisplayItemWalletCard, { DisplayItemWalletCardSkeleton } from '@/Components/Molecule/Content/DisplayItemWalletCard';
import useAPI from '@/hooks/useAPI';
import { MagicEdenPaginationT } from '@/types/datas';
import { MagicEdenHolderNFTs } from '@/types/magiceden-types';
import { BoxProps, Card, Flex, Grid, GridCol, ScrollArea, Stack, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

type PropWalletItemsT = {
  address: string;
} & BoxProps

const WalletItems = ({address, ...props}: PropWalletItemsT) => {
  const viewport = useRef<HTMLDivElement>(null);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const [ collectedData, setCollectdData ] = useState<MagicEdenHolderNFTs[]>([]);
  const [ pagination, setPagination ] = useState<MagicEdenPaginationT>({offset: 0, limit: 30, sort: 'updatedAt', sort_direction: 'desc'});
  const {data, loading, POST: getListing} = useAPI<MagicEdenHolderNFTs[], MagicEdenPaginationT>(`magic-eden/wallet/listing/${address}`);

  useEffect(() => {
    if (address !== ""){
      getListing(pagination);
    }
  },[address, pagination])

  useEffect(() => {
    if (address !== ""){
      const intervalId = setInterval(() => {
        setPagination((prev) => ({...prev, offset: 0}))
      }, 60000);
      return () => clearInterval(intervalId);
    }
  },[address])

  useEffect(() => {
    if (
      viewport.current!.scrollHeight !== viewport.current!.clientHeight && 
      viewport.current!.scrollHeight - viewport.current!.clientHeight - 5 < scrollPosition.y 
    ) {
      setPagination((prev) => ({...prev, offset: (prev.offset||0) + 1}))
    }
  },[scrollPosition])

  useEffect(() => {
    setCollectdData((prev) => pagination.offset == 0 ? data||[]:[...(prev||[]), ...(data||[])])
  },[data])

  return (
    <Stack {...props}>
      <Card>
        <ScrollArea h="calc(var(--child-height) - 102px - 52px)" viewportRef={viewport} onScrollPositionChange={onScrollPositionChange}>
          <Grid columns={10}>
            {collectedData.map((NFTData, i:number) => 
              <GridCol key={i} span={{ base: 5, md: 2, lg: 1 }}>
                <DisplayItemWalletCard data={NFTData}/>
              </GridCol>)
            }
            {!loading && collectedData.length === 0 && 
              <GridCol span={10}>
                <Flex className='w-full' h={200} justify="center" align="center">
                  <Text c="gray" fw="700" fz={20}>No "meekolony collection" NFT on this wallet</Text>
                </Flex>
              </GridCol>
            }
            {loading && Array(pagination.offset ===0 ? pagination.limit: 10).fill(null).map((_,i) => 
              <GridCol key={i} span={{ base: 5, md: 2, lg: 1 }}>
                <DisplayItemWalletCardSkeleton />
              </GridCol>)
            }
          </Grid>
        </ScrollArea>
      </Card>
    </Stack>
  );
};

export default WalletItems;
