"use client"
import './globals.css';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import BookingSteps from '@/components/BookingSteps';
import { Sora, Montserrat } from "next/font/google";
import Destination from '@/components/Destination';
import ActionButtons from '@/components/ActionButtons';
// import ChatbotMain from '@/components/ChatbotMain';
import { usePathname } from 'next/navigation';
import Script from "next/script";
import { Provider } from "react-redux";
import { store } from "../../store";

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
  const pathname = usePathname();
  const hideChatbot = pathname === '/landing-page';

  return (
    <html lang="en" className={`${sora.variable} ${montserrat.variable}`}>
      <head>
        {/* Chatbot CSS */}
        <link
          rel="stylesheet"
          href="https://vatravel-cdn.s3.amazonaws.com/prod/v1.1.1/va-travel-chatbot.min.css.br"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>{children}
          <Script
            src="https://vatravel-cdn.s3.amazonaws.com/prod/v1.1.1/va-travel-chatbot.min.js.br"
            strategy="afterInteractive"
          />
          <Navbar />
          {/* <main className="flex-grow">{children}</main> */}
          <Destination />
          <BookingSteps />
          <Footer />
          {!hideChatbot &&
            // <div className={`fixed bottom-6 md:bottom-6 right-6 md:right-6 left-6 md:left-1/2 z-60`}>
            //   <ChatbotMain chatbotId={'f9abbd99-4a16-4ff1-953b-b80bed2f8b28'} open={false} />
            // </div>
            <Script id="vat-chatbot-init" strategy="afterInteractive">
              {`
            if (typeof window !== 'undefined') {
              window.addEventListener('load', () => {
                if (window.VATravelChatBot) {
                  window.VATravelChatBot.initialize({
                    tidioApi: 'YOUR_TIDIO_API_KEY',
                    questionnaireId: 'f9abbd99-4a16-4ff1-953b-b80bed2f8b28',
                    textConfig: {
                      chatButtonText: 'Get Your Holiday Quote in 2 Minutes',
                      chatHeaderText: 'ESCAPE ELITE',
                      chatDescriptionText: 'How can we help?',
                    },
                    logoUrl: 'https://www.escapeelite.com/assets/images/ee_logo.png'
                  });
                }
              });
            }
          `}
            </Script>
          }
          <ActionButtons />
        </Provider>
      </body>
    </html>
  );
}
