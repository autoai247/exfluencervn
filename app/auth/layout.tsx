import { Suspense } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-700 flex items-center justify-center">
        <div className="spinner" />
      </div>
    }>
      {children}
    </Suspense>
  );
}
