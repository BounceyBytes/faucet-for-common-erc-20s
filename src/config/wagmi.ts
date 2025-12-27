import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet,
    injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { defineChain } from 'viem';

export const mantraDukong = defineChain({
    id: 5887,
    name: 'MANTRA Dukong Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'OM',
        symbol: 'OM',
    },
    rpcUrls: {
        default: { http: ['https://evm.dukong.mantrachain.io'] },
    },
    blockExplorers: {
        default: { name: 'MANTRA Explorer', url: 'https://explorer.dukong.io' },
    },
    testnet: true,
});

export const config = getDefaultConfig({
    appName: 'MANTRA Faucet',
    projectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
        'd05ae0b31853715c902a6b04893fe60b',
    chains: [mantraDukong],
    ssr: true, // If your dApp uses server side rendering (SSR)
    wallets: [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, injectedWallet, rainbowWallet, walletConnectWallet],
        },
    ],
});
