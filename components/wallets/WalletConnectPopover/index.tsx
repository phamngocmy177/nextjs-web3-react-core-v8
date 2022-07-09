import {
  Popover,
  Transition
} from '@headlessui/react';
import * as React from 'react';

const WalletConnectPopover = (): JSX.Element => {
  return (
    <div>
      <Popover>
        {({ open }: { open: boolean; }) => {
          return (
            <>
              <Popover.Button>
                Connect Wallets
              </Popover.Button>
              <Transition
                as={React.Fragment}
                show={open}
                enter='transition duration-100 ease-in'
                enterFrom='opacity-0'
                enterTo='opacity-100'>
                <Popover.Panel
                  static>
                  {open ? (
                    <div>
                      <span
                        className='text-base'>
                      Connected wallets
                      </span>
                    </div>
                  ) : null}
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </div>
  )
}

export default WalletConnectPopover;