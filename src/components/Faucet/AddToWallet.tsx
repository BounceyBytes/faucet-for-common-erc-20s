'use client';

import { MANTRA_TESTNET_TOKENS } from '@/constants/tokens';
import { Button } from '@/components/ui/Button';
import { useWalletClient } from 'wagmi';
import { Wallet, Plus } from 'lucide-react';

export function AddToWallet() {
    const { data: walletClient } = useWalletClient();

    const handleAddToken = async (token: typeof MANTRA_TESTNET_TOKENS[0]) => {
        if (!walletClient) return;

        try {
            await walletClient.watchAsset({
                type: 'ERC20',
                options: {
                    address: token.address,
                    decimals: token.decimals,
                    // MetaMask validates this against the ERC-20 contract's `symbol()`.
                    // Some of our faucet "tSymbols" are display-only (e.g. twMANTRA),
                    // while the on-chain token symbol is different (e.g. wMANTRA).
                    symbol: token.walletSymbol ?? token.symbol,
                },
            });
        } catch (error) {
            console.error('Failed to add token', error);
        }
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MANTRA_TESTNET_TOKENS.map((token) => (
                    <Button
                        key={token.address}
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAddToken(token)}
                        className="text-xs bg-zinc-900/50 hover:bg-zinc-800 border-white/5 hover:border-white/10 px-2"
                    >
                        <Plus className="w-3 h-3 mr-1.5" />
                        {token.symbol}
                    </Button>
                ))}
            </div>
        </div>
    );
}
