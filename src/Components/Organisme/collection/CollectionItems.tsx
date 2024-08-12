import DisplayItemCard, { DisplayItemCardSkeleton } from '@/Components/Molecule/Content/DisplayItemCard';
import useAPI from '@/hooks/useAPI';
import { MagicEdenPaginationT } from '@/types/datas';
import { MagicEdenCollectionListing } from '@/types/magiceden-types';
import { BoxProps, Card, Flex, Grid, GridCol, ScrollArea, Stack, Text } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

const CollectionItems = (props: BoxProps) => {
  const viewport = useRef<HTMLDivElement>(null);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const [ collectedData, setCollectdData ] = useState<MagicEdenCollectionListing[]>([]);
  const [ pagination, setPagination ] = useState<MagicEdenPaginationT>({offset: 0, limit: 30, sort: 'updatedAt', sort_direction: 'desc'});
  const {data, loading, POST: getListing} = useAPI<MagicEdenCollectionListing[], MagicEdenPaginationT>("magic-eden/collection/listing");

  useEffect(() => {
    getListing(pagination);
  },[pagination])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPagination((prev) => ({...prev, offset: 0}))
    }, 60000);
    return () => clearInterval(intervalId);
  },[])

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
                <DisplayItemCard data={NFTData}/>
              </GridCol>)
            }
            {!loading && collectedData.length === 0 && 
              <GridCol span={10}>
                <Flex className='w-full' h={200} justify="center" align="center">
                  <Text c="gray" fw="700" fz={20}>No NFT for this collection</Text>
                </Flex>
              </GridCol>
            }
            {loading && Array(pagination.offset ===0 ? pagination.limit: 10).fill(null).map((_,i) => 
              <GridCol key={i} span={{ base: 5, md: 2, lg: 1 }}>
                <DisplayItemCardSkeleton />
              </GridCol>)
            }
          </Grid>
        </ScrollArea>
      </Card>
    </Stack>
  );
};

export default CollectionItems;
