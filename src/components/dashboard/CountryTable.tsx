import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface TableDemoProps {
  tableData: {
    caption: string;
    headers: { key: string; label: string; className?: string }[];
    data: { [key: string]: string }[];
  };
}

export function CountryTable({ tableData }: TableDemoProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl">{tableData.caption}</h1>
      <Table className="w-[450px] mx-auto">
        <TableHeader>
          <TableRow>
            {tableData.headers.map((header) => (
              <TableHead key={header.key} className={header.className}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.data.map((row, index) => (
            <TableRow key={index}>
              {tableData.headers.map((header) => (
                <TableCell key={header.key} className={header.className}>
                  {row[header.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
