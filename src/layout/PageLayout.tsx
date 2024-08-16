import Header from "../containers/Header";

export default function PageLayout(props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const { children, title, description } = props;
  return (
    <div>
      <div className="fixed w-full">
        <Header title={title} description={description} />
      </div>
      <div className="p-8 mt-[110px]">{children}</div>
    </div>
  );
}
