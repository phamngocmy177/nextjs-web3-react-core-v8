import type { Web3ReactHooks } from '@web3-react/core'

export function Status({
  isActive
}: {
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  return (
    <div>
      {isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  )
}
