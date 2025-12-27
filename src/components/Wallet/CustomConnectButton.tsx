'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useReadContracts, useDisconnect } from 'wagmi';
import { MANTRA_TESTNET_TOKENS } from '@/constants/tokens';
import { formatUnits } from 'viem';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogOut, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Minimal ERC20 ABI for balanceOf
const ERC20_ABI = [
    {
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
] as const;

export function CustomConnectButton() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button onClick={openConnectModal} type="button">
                                        Connect Wallet
                                    </Button>
                                );
                            }
                            return <WalletDropdown account={account} chain={chain} />;
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}

function WalletDropdown({ account, chain }: { account: any, chain: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const { disconnect } = useDisconnect();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Fetch Native OM Balance
    const { data: ethBalance } = useBalance({
        address: account.address,
    });

    // Fetch ERC20 Balances
    const { data: tokenBalances } = useReadContracts({
        contracts: MANTRA_TESTNET_TOKENS.map((token) => ({
            address: token.address,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [account.address],
        })),
    });

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800/50 border border-white/10 rounded-full transition-all duration-200"
            >
                <div className="flex flex-col items-end text-xs mr-2">
                    <span className="font-bold text-white uppercase">{chain.name}</span>
                    <span className="text-zinc-400 font-mono">
                        {account.displayName}
                    </span>
                </div>
                {account.ensAvatar ? (
                    <img
                        src={account.ensAvatar}
                        alt="ENS Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mantra-pink to-mantra-purple flex items-center justify-center text-white text-xs font-bold">
                        <Wallet className="w-4 h-4" />
                    </div>
                )}
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 px-1">
                        Your Balances
                    </h3>

                    <div className="space-y-1 mb-4">
                        {/* Native OM */}
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-mantra-pink/20 flex items-center justify-center text-mantra-pink text-[10px] font-bold">
                                    OM
                                </div>
                                <span className="text-sm font-medium text-zinc-200">OM</span>
                            </div>
                            <span className="text-sm font-mono text-zinc-400">
                                {ethBalance ? Number(formatUnits(ethBalance.value, ethBalance.decimals)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                            </span>
                        </div>

                        {/* ERC20 Tokens */}
                        {MANTRA_TESTNET_TOKENS.map((token, index) => {
                            const balance = tokenBalances?.[index]?.result;
                            const formattedBalance = balance ? Number(formatUnits(balance as bigint, token.decimals)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00';

                            return (
                                <div key={token.address} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-[10px] font-bold">
                                            {token.symbol[0]}
                                        </div>
                                        <span className="text-sm font-medium text-zinc-200">{token.symbol}</span>
                                    </div>
                                    <span className="text-sm font-mono text-zinc-400">
                                        {formattedBalance}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-3 border-t border-white/5">
                        <button
                            onClick={() => disconnect()}
                            className="w-full flex items-center justify-center gap-2 p-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
