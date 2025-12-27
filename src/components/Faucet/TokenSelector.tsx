'use client';

import { useState } from 'react';
import { MANTRA_TESTNET_TOKENS, Token } from '@/constants/tokens';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TokenSelectorProps {
    selectedToken: Token;
    onSelect: (token: Token) => void;
}

export function TokenSelector({ selectedToken, onSelect }: TokenSelectorProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {MANTRA_TESTNET_TOKENS.map((token) => {
                const isSelected = selectedToken.address === token.address;
                return (
                    <TokenButton
                        key={token.address}
                        token={token}
                        isSelected={isSelected}
                        onSelect={onSelect}
                    />
                );
            })}
        </div>
    );
}

function TokenButton({ token, isSelected, onSelect }: { token: Token; isSelected: boolean; onSelect: (token: Token) => void }) {
    const [imageError, setImageError] = useState(false);

    return (
        <button
            onClick={() => onSelect(token)}
            className={cn(
                'relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300',
                'hover:bg-zinc-800/50 hover:scale-[1.02]',
                isSelected
                    ? 'bg-mantra-pink/10 border-mantra-pink/50 ring-1 ring-mantra-pink/20 shadow-[0_0_20px_rgba(232,91,128,0.15)]'
                    : 'bg-zinc-900/40 border-white/5 hover:border-white/10'
            )}
        >
            <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 overflow-hidden',
                isSelected ? 'ring-2 ring-mantra-pink/50' : '',
                imageError ? (isSelected ? 'bg-mantra-gradient text-white' : 'bg-zinc-800 text-zinc-400') : ''
            )}>
                {imageError ? (
                    <span className="font-bold text-lg">{token.symbol[0]}</span>
                ) : (
                    <img 
                        src={token.logoUrl} 
                        alt={token.symbol}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <span className={cn('text-sm font-medium transition-colors', isSelected ? 'text-white' : 'text-zinc-400')}>
                {token.symbol}
            </span>
            {isSelected && (
                <div className="absolute top-2 right-2 text-mantra-pink animate-in fade-in zoom-in duration-200">
                    <Check className="w-4 h-4" />
                </div>
            )}
        </button>
    );
}
