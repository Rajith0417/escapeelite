import './globals.css';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import BookingSteps from '@/components/BookingSteps';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <BookingSteps/>
        <Footer />
      </body>
    </html>
  );
}
