import { DataTable } from "../user-management";
import data from "../../json/dummyData/supportBusiness.json";
import { SupportColumns } from "./Columns";

export default function Business() {
  return (
    <div>
      <DataTable
        columns={SupportColumns}
        data={data}
        title=""
        detailViewType="dialog"
      />
    </div>
  );
}
