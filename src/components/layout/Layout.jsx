export default function Layout({ children, view }) {
  return (
    <main className="min-h-screen transition-colors duration-300 dark:bg-surface-dark bg-slate-50">
      {children}
    </main>
  );
}
