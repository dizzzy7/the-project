export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid lg:grid-cols-[19rem_auto] h-full min-h-screen">
      {children}
    </div>
  );
}
