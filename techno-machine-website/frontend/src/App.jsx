import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import Showcase from './components/Showcase';
import Process from './components/Process';
import LocationMap from './components/LocationMap';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Categories />
        <Showcase />
        <Process />
        <LocationMap />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
