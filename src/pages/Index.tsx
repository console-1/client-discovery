
import DiscoveryForm from '@/components/DiscoveryForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PAGE_CONTENT } from '@/lib/content';

const Index = () => {
  const { header } = PAGE_CONTENT;
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900">
      <Header title={header.title} subtitle={header.subtitle} />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-32 pb-24 flex flex-col">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="flex flex-col items-center">
            <p 
              style={{ animationDelay: '200ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono py-4"
            >
              Design Music Code is a duopreneurs dream to leverage Artificial Intelligence and Machine Learning to automate the inner workings of a creative organization, allowing for more time to explore, invent, ideate, and, you guessed it... create.
            </p>
            
            <p 
              style={{ animationDelay: '300ms' }} 
              className="text-stone-600 dark:text-stone-300 max-w-2xl animate-fade-in font-mono py-4"
            >
              Great partnerships begin with honest conversations. This isn't just another form, it's a chance to paint a picture of your business's unique story, the more you reveal, the better we can craft unique solutions to inspire your next chapter.
            </p>
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
