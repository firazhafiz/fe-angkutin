import Auth from "../../../components/organisms/Auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Auth>{children}</Auth>;
}
