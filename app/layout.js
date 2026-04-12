import "./globals.css";

export const metadata = {
  title: "La Specola — Osservare oggi per comprendere il domani",
  description: "Blog di analisi e commento su attualità, motori, tecnologia e storia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
