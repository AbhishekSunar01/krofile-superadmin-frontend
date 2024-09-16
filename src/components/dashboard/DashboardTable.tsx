import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Card } from "../../components/ui/card";

import growth from "../../assets/svg/growth.svg";

interface DashboardTableProps {
  data: Record<string, any>[];
  title: string;
  type: string;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  data,
  title,
  type,
}) => {
  const industry = [
    { key: "_id", header: "SL No" },
    { key: "industryType", header: "Industry Type" },
    { key: "count", header: "Count" },
    { key: "ratio", header: "Ratio" },
  ];
  const subscribers = [
    { key: "_id", header: "SL No" },
    { key: "businessName", header: "Business Name" },
    { key: "date", header: "Reg. Date" },
    { key: "plan", header: "Subs. Plan" },
  ];
  const columns = type === "industry" ? industry : subscribers;

  const totalData = React.useMemo(
    () => data.reduce((acc, curr) => acc + (curr.count ?? 0), 0),
    [data]
  );

  return (
    <Card className="w-full flex flex-col">
      {" "}
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-5">
        <div className="font-normal text-sm">{title}</div>

        <div className="flex items-center gap-x-2">
          <span className="text-base font-semibold leading-none">
            {totalData.toLocaleString()}{" "}
          </span>{" "}
          <span className="text-xs flex items-center text-primary gap-1 ">
            {" "}
            <img
              src={growth}
              alt="growth"
              className="bg-accentGreen p-1 rounded-full"
            />{" "}
            <span className="text-accentGreen">26%</span>
            vs previous period
          </span>
        </div>
      </div>
      <div className="px-5 py-2">
        {" "}
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-sm font-medium text-left pl-4 py-3 mb-[18px]"
                >
                  {column.header}
                </th>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className=" text-left pl-5   py-3
                 border-0"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default DashboardTable;
