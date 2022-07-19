
import ActiveConnectorCard from '../components/connectors/ActiveConnectorCard';
import { SUPPORTED_WALLET } from 'constants/wallets';
import WalletCard from 'components/connectors/WalletCard';

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        {Object.keys(SUPPORTED_WALLET).map(item => (
          <WalletCard
            key={item}
            hooks={SUPPORTED_WALLET[item].hooks}
            connector={SUPPORTED_WALLET[item].connector}
            wallet={SUPPORTED_WALLET[item]}
            walletId={item} />
        ))}
      </div>
      <ActiveConnectorCard />
    </>
  )
}
