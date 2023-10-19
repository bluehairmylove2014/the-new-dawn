"use client";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import Notification from "@/components/molecules/Notification/Notification";
import FullScreenLoader from "@/components/molecules/FullScreenLoader/FullScreenLoader";
import Catalog from "@/components/organisms/Catalog/Catalog";
import { usePathname } from "next/navigation";
import { PAGE_URLS } from "@/constants/pages";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Methods
  const isNormalLayout = (pathname: string) => {
    switch (pathname) {
      case PAGE_URLS.LOGIN:
      case PAGE_URLS.PROVIDE_INFO:
        return false;
      default:
        return true;
    }
  };

  return (
    <>
      {isNormalLayout(pathname) ? (
        <>
          <Catalog />
          <Header />
          <FullScreenLoader />
          <Notification />
          <div
            className="margin-top__to-main"
            style={{ width: "100vw", height: "110px" }}
          ></div>
          {children}
          <Footer />
        </>
      ) : (
        <>
          <FullScreenLoader />
          <Notification />
          {children}
        </>
      )}
    </>
  );
};

export default MainTemplate;
