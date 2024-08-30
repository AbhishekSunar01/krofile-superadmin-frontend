import Header from "../containers/Header";

export default function PageLayout(props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const { children, title, description } = props;
  return (
    <div className="">
      <div className="sticky top-0 w-full z-50">
        <Header title={title} description={description} />
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
