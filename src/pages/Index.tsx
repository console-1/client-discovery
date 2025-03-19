
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
            <p 
              style={{ animationDelay: '200ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono py-4"
            >
              DMC orchestrates three pioneering platforms that harness AI, ML, and automation to eliminate tedious business processes.
            </p>
            
            <p 
              style={{ animationDelay: '300ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono py-2"
            >
              alchemedia lab. powers design innovation, happy little accidents crafts sonic experiences, and console-one engineers technical solutions through code.
            </p>
            
            <p 
              style={{ animationDelay: '400ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono py-2 mb-4"
            >
              Operating both independently and as an integrated ecosystem, these specialized studios deliver tailored creative solutions that transform client visions into reality.
            </p>
            
            {/* Added margin-top to create space between the paragraph and chip */}
            <span className="inline-block chip-mint mb-2 animate-fade-in py-0 my-0 mx-0 px-[9px] mt-4">
              DO MORE CREATIVELY
            </span>
            
            {/* Paragraph moved to DiscoveryForm component */}
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
