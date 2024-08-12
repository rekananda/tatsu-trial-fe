import CollectionInfo from '@/Components/Organisme/collection/CollectionInfo';
import CollectionItems from '@/Components/Organisme/collection/CollectionItems';
import useAPI from '@/hooks/useAPI';
import MainLayout from '@/Layout';
import { CollectionInfoT } from '@/types/magiceden-types';
import { Stack } from '@mantine/core';
import { useEffect } from 'react';

function App() {
  const {data: collectionInfo, loading, GET: getCollectionInfo} = useAPI<CollectionInfoT>("magic-eden/collection/info");

  useEffect(() => {
    getCollectionInfo();
    const intervalId = setInterval(getCollectionInfo, 60000);
    return () => clearInterval(intervalId);
  },[])

  return (
    <MainLayout>
      <Stack>
        <CollectionInfo data={collectionInfo} loading={loading}/>
        <CollectionItems />
      </Stack>
    </MainLayout>
  );
}

export default App;