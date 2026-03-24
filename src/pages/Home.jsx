import Hero from '../components/Hero';
import Services from '../components/Services';
import Technologies from '../components/Technologies';
import HowWeWork from '../components/HowWeWork';
import AboutSection from '../components/AboutSection';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import BlogSection from '../components/BlogSection';
import ContactBanner from '../components/ContactBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Technologies />
      <HowWeWork />
      <AboutSection />
      <Stats />
      <Testimonials />
      <Partners />
      <BlogSection />
      <ContactBanner />
    </>
  );
}
