import Header from "../../../components/organisms/Header";
import Footer from "../../../components/organisms/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
