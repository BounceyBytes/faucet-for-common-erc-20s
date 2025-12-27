export type Token = {
    symbol: string;
    /**
     * Optional: symbol reported by the ERC-20 contract on-chain (ERC20 `symbol()`),
     * used for `wallet_watchAsset`/MetaMask validation.
     *
     * If omitted, defaults to `symbol`.
     */
    walletSymbol?: string;
    name: string;
    address: `0x${string}`;
    decimals: number;
    logoUrl: string;
};

export const MANTRA_TESTNET_TOKENS: Token[] = [
    {
        symbol: 'twMANTRA',
        walletSymbol: 'wMANTRA',
        name: 'Wrapped MANTRA (Testnet)',
        address: '0x10d26F0491fA11c5853ED7C1f9817b098317DC46',
        decimals: 18,
        logoUrl: 'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="40" height="40" rx="20" fill="%23E85B80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white"%3EM%3C/text%3E%3C/svg%3E', // Placeholder with 'M' and pink background (#E85B80)
    },
    {
        symbol: 'tmantraUSD',
        walletSymbol: 'mmUSD',
        name: 'MANTRA USD (Testnet)',
        address: '0x4B545d0758eda6601B051259bD977125fbdA7ba2',
        decimals: 6, // Must match contract `decimals()` (MetaMask validates this in wallet_watchAsset)
        logoUrl: 'https://assets.coingecko.com/coins/images/71237/standard/mantraUSD_token.png?1766549973', // mantraUSD logo from CoinGecko
    },
    {
        symbol: 'tUSDC',
        walletSymbol: 'USDC',
        name: 'USD Coin (Testnet)',
        address: '0x49b163c575948F0b95e0c459C301995147f27866',
        decimals: 6,
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png', // USDC mainnet logo
    },
    {
        symbol: 'tUSDT',
        walletSymbol: 'USDT',
        name: 'Tether USD (Testnet)',
        address: '0x21E56013a76a7F1F86cF7ee95c0a5670C7b7e44D',
        decimals: 6,
        logoUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png', // USDT mainnet logo
    },
];
