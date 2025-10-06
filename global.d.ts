export {};

declare global {
  interface Window {
    VATravelChatBot?: {
      initialize: (config: {
        containerId: string;
        embedded?: boolean;
        tidioApi?: string;
        questionnaireId?: string;
        textConfig?: {
          chatHeaderText?: string;
          chatDescriptionText?: string;
        };
        logoUrl?: string;
      }) => void;
    };
  }
}
