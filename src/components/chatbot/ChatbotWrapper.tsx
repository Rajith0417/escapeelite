'use client';
import { useEffect } from "react";

interface ChatbotProps {
  chatbotId: string;
  open?: boolean;
}

function ChatbotWrapper({chatbotId, open}: ChatbotProps) {
    useEffect(() => {
        const interval = setInterval(() => {
          if (typeof window !== "undefined" && window.VATravelChatBot) {
            window.VATravelChatBot.initialize({
              containerId: "my-chat-container",
              embedded: true,
              tidioApi: "YOUR_TIDIO_API_KEY",
              questionnaireId: chatbotId,
            //   textConfig: { chatHeaderText: "ESCAPE ELITE" },
              logoUrl: "https://www.escapeelite.com/assets/images/ee_logo.png",
            });
            clearInterval(interval);
          }
        }, 500);
    
        return () => clearInterval(interval);
    }, []);

    return <div id="my-chat-container" className="w-full h-full"></div>;
}

export default ChatbotWrapper
