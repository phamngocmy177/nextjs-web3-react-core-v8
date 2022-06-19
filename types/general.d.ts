
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type {
  ReactElement,
  ReactNode
} from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export type {
  NextPageWithLayout,
  AppPropsWithLayout
};

