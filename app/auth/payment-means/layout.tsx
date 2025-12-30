import Signout from "@/components/auth/Signout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-white">
      <Signout /> {children}
    </div>
  );
}
