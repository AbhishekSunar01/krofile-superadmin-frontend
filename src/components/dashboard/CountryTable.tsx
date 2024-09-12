import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Card } from "../ui/card";

interface Country {
  _id: string;
  country: string;
  ratio: string;
  count: number;
}

interface CountryTableProps {
  tableData: Country[];
}

const CountryTable: React.FC<CountryTableProps> = ({ tableData }) => {
  const importFlag = async (iconName: string) => {
    try {
      const flag = await import(`../../assets/svg/flag/${iconName}.svg`);
      return flag.default;
    } catch (error) {
      console.error(`Error loading flag for ${iconName}:`, error);
      return null;
    }
  };

  return (
    <Card className="flex flex-col bg-white rounded-md px-4 pt-4">
      <div className="px-2 gap-2 flex flex-col">
        <span className="text-sm font-normal">Statistics</span>
        <span className="text-sm font-medium">Popular Countries</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-3">Country</TableHead>
            <TableHead>Ratio</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map(({ _id, country, ratio, count }) => {
            const iconName = country?.toLowerCase();
            const [flagSrc, setFlagSrc] = React.useState<string | null>(null);

            React.useEffect(() => {
              importFlag(iconName).then(setFlagSrc);
            }, [iconName]);

            return (
              <TableRow key={_id}>
                <TableCell className="font-medium py-3 flex gap-2 items-center">
                  {flagSrc && (
                    <img
                      className="h-[24px] w-[24px]"
                      src={flagSrc}
                      alt={`${country} flag`}
                      height={50}
                      width={50}
                    />
                  )}
                  {country}
                </TableCell>
                <TableCell>{ratio}</TableCell>
                <TableCell>{count}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default React.memo(CountryTable);
