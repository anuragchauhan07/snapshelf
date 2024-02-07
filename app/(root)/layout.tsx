import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex w-full justify-center items-center">
       
        <div className="sm:w-[1000px] w-full p-2 sm:p-4 bg-black">
          <Header />
          <div className="min-h-[70vh]">{children}</div>
          <Footer />
        </div>
        

      </body>
    </html>
  );
}
