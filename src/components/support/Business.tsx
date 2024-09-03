import { DataTable } from "../user-management";
import data from "../../json/dummyData/supportBusiness.json";
import { SupportBusinessColumns } from "./columns/BusinessColumns";

export default function Business() {
  return (
    <div>
      <DataTable
        columns={SupportBusinessColumns}
        data={data}
        title=""
        detailViewType="dialog"
      />
    </div>
  );
}
