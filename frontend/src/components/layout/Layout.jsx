import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Wraps every page with the shared Navbar and Footer. `transparentHero`
 * controls whether the navbar starts transparent (only the homepage,
 * which has a full-bleed dark hero behind it) — other pages get a
 * solid navbar from the start since their heroes are lighter/shorter.
 */
export default function Layout({ children, transparentHero = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar transparentOnHero={transparentHero} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
