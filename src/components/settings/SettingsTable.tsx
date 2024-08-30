import { useState } from "react";
import settingsData from "../../json/dummyData/settingsData.json";
import { Columns, userData } from "./columns";
import { DataTableComponent } from "./DataTableComponent";

const SettingsTable = () => {
  const [data] = useState<userData[]>(settingsData);

  return (
    <>
      <div className="table border-none w-full">
        <DataTableComponent columns={Columns} data={data} />
      </div>
    </>
  );
};

export default SettingsTable;
