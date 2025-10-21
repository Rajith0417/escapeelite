interface TripAdvisorProps {
  code: string;
}


export default function TripAdvisorWidget({ code }: TripAdvisorProps) {
  return (
    <div
      className="tripadvisor-widget"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
