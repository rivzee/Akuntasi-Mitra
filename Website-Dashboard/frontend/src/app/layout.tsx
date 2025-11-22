export const metadata = {
  title: 'Cek Layout',
  description: 'Tes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* INI PENTING: {children} adalah isi halaman. Kalau ini hilang, layar putih. */}
        {children} 
      </body>
    </html>
  );
}