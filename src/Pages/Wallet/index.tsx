import WalletInfo from '@/Components/Organisme/wallet/WalletInfo';
import WalletItems from '@/Components/Organisme/wallet/WalletItems';
import useAPI from '@/hooks/useAPI';
import MainLayout from '@/Layout';
import { WalletInfoT } from '@/types/magiceden-types';
import { Stack } from '@mantine/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function WalletPage() {
  const { wallletAddress } = useParams<{ wallletAddress: string }>();

  const {data, loading, GET: getCollectionInfo} = useAPI<WalletInfoT>(`magic-eden/wallet/info${wallletAddress ? '/'+wallletAddress:''}`);

  useEffect(() => {
    getCollectionInfo();
    const intervalId = setInterval(getCollectionInfo, 60000);
    return () => clearInterval(intervalId);
  },[wallletAddress])

  return (
    <MainLayout>
      <Stack>
        <WalletInfo data={data} loading={loading}/>
        <WalletItems address={data?.address || ""} />
      </Stack>
    </MainLayout>
  );
}

export default WalletPage;