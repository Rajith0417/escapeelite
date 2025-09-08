import './globals.css';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import BookingSteps from '@/components/BookingSteps';
import { Sora, Montserrat } from "next/font/google";
import Destination from '@/components/Destination';
import ActionButtons from '@/components/ActionButtons';
import ChatbotMain from '@/components/ChatbotMain';

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${montserrat.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Destination/>
        <BookingSteps/>
        <Footer />
        <ChatbotMain chatbotId={'f9abbd99-4a16-4ff1-953b-b80bed2f8b28'} />
        <ActionButtons/>
      </body>
    </html>
  );
}
