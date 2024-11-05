import Header from "../containers/Header";

export default function PageLayout(props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const { children, title, description } = props;
  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full z-40 pl-[260px]">
        <Header title={title} description={description} />
      </div>
      <div className="p-6 mt-32">{children}</div>
    </div>
  );
}
