import Header from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white relative overflow-hidden">
      {/* Global Background with Purple Radial Gradients */}
      <div className="fixed inset-0 z-0">
        <div className="radial-gradient-1"></div>
        <div className="radial-gradient-2"></div>
        <div className="radial-gradient-3"></div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Header />
        <main className="pt-16">
        </main>
      </div>
    </div>
  );
}
