'use client';
import { useEffect } from "react";

interface ChatbotProps {
    chatbotId: string;
}

export default function ChatbotWrapperLanding({ chatbotId }: ChatbotProps) {
    useEffect(() => {
        const interval = setInterval(() => {
            if (typeof window !== "undefined" && window.VATravelChatBot) {
                const isMobile = window.innerWidth <= 768; // 📱 Mobile breakpoint

                window.VATravelChatBot.initialize({
                    containerId: "chat-widget-container",
                    embedded: !isMobile, // 🖥 true for desktop, false for mobile
                    questionnaireId: chatbotId,
                    tidioApi: "YOUR_TIDIO_API_KEY",
                    textConfig: {
                        chatHeaderText: "Get Your Holiday Quote in 2 Minutes"
                    },
                    logoUrl: "https://www.escapeelite.com/assets/images/ee_logo.png",
                });

                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [chatbotId]);

    return (
        <div
            id="chat-widget-container"></div>
    );
}
