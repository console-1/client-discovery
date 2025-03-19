
import DiscoveryForm from '@/components/DiscoveryForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PAGE_CONTENT } from '@/lib/content';

const Index = () => {
  const { header } = PAGE_CONTENT;
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-20 pb-24 flex flex-col">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="flex flex-col items-center">
            <span className="inline-block chip-mint mb-2 animate-fade-in py-0 my-0 mx-0 px-[9px]">
              CLIENT DISCOVERY
            </span>
            <h1 
              style={{ animationDelay: '100ms' }} 
              className="font-medium text-stone-800 dark:text-stone-100 mb-4 animate-fade-in text-2xl"
            >
              DO MORE CREATIVELY
            </h1>
          </div>
        </div>

        <div className="flex-grow">
          <DiscoveryForm />
        </div>
      </main>
      <Footer title={header.title} />
    </div>
  );
};

export default Index;
