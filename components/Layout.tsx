import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = { children?: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className="admin-dashboard">{children}</div>
      <Footer />
    </div>
  );
}
