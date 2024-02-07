export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-full items-center justify-center my-10">{children}</body>
    </html>
  );
}
