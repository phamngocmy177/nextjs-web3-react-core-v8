
import * as React from 'react';
import {
  Contract,
  ContractInterface
} from '@ethersproject/contracts';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

import ERC20_ABI from 'abis/erc20.json';

function useContract(address: string | undefined, ABI: ContractInterface): Contract | null {
  const { library, chainId } = useActiveWeb3React();
  return React.useMemo(() => {
    if (!ABI || !library || !chainId || !address) return null;

    try {
      return new Contract(address, ABI, library?.getSigner());
    } catch (error) {
      return null;
    }
  }, [
    ABI,
    address,
    chainId,
    library
  ]);
}

function useERC20Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, ERC20_ABI);
}

export default useContract;

export {
  useERC20Contract,
};
