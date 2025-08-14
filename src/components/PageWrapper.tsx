interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="p-6 border-2 border-cms-border rounded-lg m-6 bg-cms-surface min-h-[calc(100vh-8rem)]">
      {children}
    </div>
  );
};
