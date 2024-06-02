import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative bg-black-3 flex">
        <LeftSidebar />
        <section>
          <div>
            <div>
              <Image />
              MobileNav
            </div>
            <div>
              Toaster
              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
    </div>
  );
}
