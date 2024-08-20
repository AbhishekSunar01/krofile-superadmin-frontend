import { useContentManagementStore } from "../../app/store";
import background from "../../assets/png/Gradient background.png";

export default function FinalPreview() {
  const { title, body, tagLine } = useContentManagementStore();

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
      className="p-11 flex flex-col items-center"
    >
      <h2>{title}</h2>
      <p className="text-center">{body}</p>
      <p>{tagLine}</p>
    </div>
  );
}
