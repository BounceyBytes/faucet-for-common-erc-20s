'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { TokenSelector } from './TokenSelector';
import { MintButton } from './MintButton';
import { AddToWallet } from './AddToWallet';
import { MANTRA_TESTNET_TOKENS, Token } from '@/constants/tokens';
import { AlertCircle, Droplets } from 'lucide-react';

export function FaucetCard() {
    const [selectedToken, setSelectedToken] = useState<Token>(MANTRA_TESTNET_TOKENS[0]);

    return (
        <Card className="w-full max-w-xl mx-auto space-y-8 bg-black/40 border-white/5 backdrop-blur-2xl ring-1 ring-white/10">
            <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-mantra-pink/20 to-mantra-purple/20 rounded-2xl flex items-center justify-center text-mantra-pink mb-6 ring-1 ring-white/10 rotate-3">
                    <Droplets className="w-8 h-8 drop-shadow-[0_0_15px_rgba(232,91,128,0.5)]" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    Faucet for Common tTokens
                </h2>
                <p className="text-zinc-400 text-sm max-w-[80%] mx-auto leading-relaxed">
                    This faucet mints testnet versions of common ERC-20s on MANTRA chain's testnet to save developers time :)
                </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
                <h3 className="text-sm font-medium text-white/90 text-center">
                    Need to mint testnet versions of common tokens?
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                            Select Token
                        </label>
                    </div>
                    <TokenSelector
                        selectedToken={selectedToken}
                        onSelect={setSelectedToken}
                    />
                </div>

                <div className="pt-2">
                    <MintButton token={selectedToken} />
                </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-sm font-medium text-white/90 text-center">
                    Are testnet tokens not showing up in your wallet?
                </h3>
                <AddToWallet />
            </div>

            <div className="flex items-start gap-3 p-4 bg-mantra-pink/5 text-mantra-pink/90 rounded-2xl text-xs border border-mantra-pink/10 leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                    Ensure you have some testnet OM for gas fees.
                    You can get gas tokens from the <a href="https://faucet.dukong.mantrachain.io/" target="_blank" className="underline hover:text-white font-medium transition-colors">official Testnet Faucet</a>.
                </p>
            </div>
        </Card>
    );
}
