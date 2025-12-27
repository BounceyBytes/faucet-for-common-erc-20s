'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { Token } from '@/constants/tokens';
import { parseUnits } from 'viem';
import { mantraDukong } from '@/config/wagmi';

// Standard ERC20 Mint Interface
const ERC20_MINT_ABI = [
    {
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;

// WETH-style Deposit Interface for wrapped native tokens (deposit() payable)
const WRAPPED_NATIVE_ABI = [
    {
        constant: false,
        inputs: [],
        name: 'deposit',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
] as const;

interface MintButtonProps {
    token: Token;
}

export function MintButton({ token }: MintButtonProps) {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();

    const { data: balanceData } = useBalance({
        address: address,
    });

    const { data: hash, isPending: isMinting, writeContract, error: mintError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const handleMint = () => {
        if (!address) return;

        // Custom logic for Wrapped MANTRA (twMANTRA)
        // Wrapped native tokens are minted by depositing the chain's native token, not by calling an ERC-20 `mint`.
        if (token.symbol === 'twMANTRA') {
            // Wrap 10 native tokens
            const amount = parseUnits('10', token.decimals);

            writeContract({
                address: token.address,
                abi: WRAPPED_NATIVE_ABI,
                functionName: 'deposit',
                args: [],
                value: amount,
            });
            return;
        }

        // Default Mint Logic for other tokens
        // Mint 1,000,000 tokens
        const amount = parseUnits('1000000', token.decimals);

        writeContract({
            address: token.address,
            abi: ERC20_MINT_ABI,
            functionName: 'mint',
            args: [address, amount],
        });
    };

    const handleSwitchNetwork = () => {
        switchChain({ chainId: mantraDukong.id });
    };

    if (!isConnected) {
        return (
            <div className="w-full text-center text-zinc-500 text-sm">
                Please connect your wallet to mint tokens.
            </div>
        );
    }

    // 1. Check Network
    if (chainId !== mantraDukong.id) {
        return (
            <Button
                onClick={handleSwitchNetwork}
                className="w-full py-6 text-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 ring-1 ring-red-500/50"
            >
                Switch to MANTRA Testnet
            </Button>
        );
    }

    // 2. Check Gas Balance
    const hasGas = balanceData && balanceData.value > 0n;
    if (!hasGas) {
        return (
            <div className="space-y-3">
                <Button
                    onClick={() => window.open('https://faucet.dukong.mantrachain.io/', '_blank')}
                    className="w-full py-6 text-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 ring-1 ring-yellow-500/50"
                >
                    Get OM for Gas (Web Faucet)
                </Button>
                <p className="text-center text-xs text-yellow-500/80">
                    You need testnet OM to pay for transaction fees.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <Button
                onClick={handleMint}
                isLoading={isMinting || isConfirming}
                disabled={isMinting || isConfirming}
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-[#E85B80] to-[#E85B80]/90 hover:from-[#D64A6F] hover:to-[#D64A6F]/90 shadow-[0_0_20px_rgba(232,91,128,0.3)] hover:shadow-[0_0_30px_rgba(232,91,128,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-white border-0"
            >
                {isMinting
                    ? 'Check Wallet...'
                    : isConfirming
                        ? token.symbol === 'twMANTRA' ? 'Wrapping...' : 'Minting...'
                        : token.symbol === 'twMANTRA'
                            ? `Wrap 10 MANTRA`
                            : `Mint 1M ${token.symbol}`}
            </Button>

            {mintError && (
                <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-center break-all">
                    Error: {mintError.message.slice(0, 100)}...
                </div>
            )}

            {isConfirmed && (
                <div className="p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                    Successfully {token.symbol === 'twMANTRA' ? 'wrapped' : 'minted'} {token.symbol}!
                    <a
                        href={`https://explorer.dukong.io/tx/${hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block mt-1 underline hover:text-green-300"
                    >
                        View on Explorer
                    </a>
                </div>
            )}
        </div>
    );
}
