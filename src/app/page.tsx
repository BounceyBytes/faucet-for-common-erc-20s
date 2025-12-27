import { FaucetCard } from "@/components/Faucet/FaucetCard";
import { CustomConnectButton } from '@/components/Wallet/CustomConnectButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mantra-pink/20 via-mantra-dark to-black -z-10" />

      {/* Header with Wallet Connect */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-end z-20">
        <CustomConnectButton />
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        {/* Optional Header Content could go here */}
      </div>

      <div className="relative flex place-items-center">
        <div className="absolute -inset-10 bg-gradient-to-r from-mantra-pink to-mantra-purple opacity-20 blur-3xl rounded-full" />
        <FaucetCard />
      </div>

      <div className="absolute bottom-4 text-center text-xs text-zinc-600">
        <p>MANTRA Testnet Faucet • strictly for testing purposes</p>
      </div>
    </main>
  );
}
