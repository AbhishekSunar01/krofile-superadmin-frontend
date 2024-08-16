import Header from "../containers/Header";

export default function PageLayout(props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const { children, title, description } = props;
  return (
    <div className="relative">
      <div className="sticky top-0 w-full">
        <Header title={title} description={description} />
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}
