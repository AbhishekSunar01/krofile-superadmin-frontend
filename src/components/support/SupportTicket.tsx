import { DataTable } from "../user-management";
import { TicketColumn } from "./columns/TicketColumn";
import data from "../../json/dummyData/supportTicket.json";

export default function SupportTicket() {
  return (
    <div>
      <DataTable
        columns={TicketColumn}
        data={data}
        title=""
        detailViewType="ticket"
      />
    </div>
  );
}
