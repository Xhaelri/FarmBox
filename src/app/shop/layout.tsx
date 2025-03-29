import FilterBar from "@/components/FilterBar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <FilterBar />
      {children}
    </div>
  );
};

export default layout;
