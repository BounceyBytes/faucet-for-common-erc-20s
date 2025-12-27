# Faucet for Common ERC-20s (MANTRA Dukong Testnet)

A small **Next.js + RainbowKit/Wagmi** web app that helps developers quickly get **testnet versions of common ERC‑20 tokens** on **MANTRA Dukong Testnet**.

This is *not* a “drip faucet contract” — the UI directly calls token contract methods:

- For most tokens: calls `mint(to, amount)` on the ERC‑20 token contract.
- For `twMANTRA`: calls `deposit()` (WETH-style) with native **OM** to wrap.

## What network is this for?

- **Chain**: MANTRA Dukong Testnet
- **Chain ID**: `5887`
- **RPC**: `https://evm.dukong.mantrachain.io`
- **Explorer**: `https://explorer.dukong.io`

You must have **testnet OM** to pay gas (and to wrap OM into `twMANTRA`).

- Official OM faucet: `https://faucet.dukong.mantrachain.io/`

## Tokens supported (defaults)

Configured in `src/constants/tokens.ts`:

| Symbol (UI) | Name | Address | Decimals | Mint/Wrap behavior |
|---|---|---|---:|---|
| `twMANTRA` | Wrapped MANTRA (Testnet) | `0x10d26F0491fA11c5853ED7C1f9817b098317DC46` | 18 | Wraps **10 OM** via `deposit()` |
| `tmantraUSD` | MANTRA USD (Testnet) | `0x4B545d0758eda6601B051259bD977125fbdA7ba2` | 6 | Mints **1,000,000** via `mint(to, amount)` |
| `tUSDC` | USD Coin (Testnet) | `0x49b163c575948F0b95e0c459C301995147f27866` | 6 | Mints **1,000,000** via `mint(to, amount)` |
| `tUSDT` | Tether USD (Testnet) | `0x21E56013a76a7F1F86cF7ee95c0a5670C7b7e44D` | 6 | Mints **1,000,000** via `mint(to, amount)` |

Notes:

- The “t” prefix is a **display convention**. For wallet token-add, MetaMask validates `symbol()`; some tokens use `walletSymbol` (see `src/constants/tokens.ts`) when calling `wallet_watchAsset`.
- If you change token contracts, the minting logic in `src/components/Faucet/MintButton.tsx` assumes either:
  - a standard `mint(address to, uint256 amount)` function, or
  - a WETH-style `deposit()` payable function (used for `twMANTRA`).

## Running locally

### Prereqs

- Node.js 20+
- npm
- A wallet (MetaMask/etc) connected to **MANTRA Dukong Testnet**

### Install

```bash
npm install
```

### (Optional) WalletConnect Project ID

RainbowKit uses WalletConnect. You can provide your own project id via:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

Create a `.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

If not set, the app falls back to a default id in `src/config/wagmi.ts`.

### Start dev server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## How it works (high level)

- **Chain config**: `src/config/wagmi.ts` (defines chain 5887 + RPC + explorer)
- **Token list**: `src/constants/tokens.ts`
- **Mint/wrap**: `src/components/Faucet/MintButton.tsx`
- **Add tokens to wallet**: `src/components/Faucet/AddToWallet.tsx` (uses `wallet_watchAsset`)

## Disclaimer

This project is for **testnet/dev convenience only**. It assumes the referenced token contracts allow minting/wrapping as described. Always verify contract addresses and behavior before using in your workflow.
