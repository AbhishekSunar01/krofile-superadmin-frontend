import React, { useEffect, useMemo, useState } from "react";

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
  className?: string;
}

const importFlag = async (iconName: string): Promise<string | null> => {
  try {
    const flag = await import(`../../assets/svg/flag/${iconName}.svg`);
    return flag.default;
  } catch (error) {
    console.error(`Error loading flag for ${iconName}:`, error);
    return null;
  }
};

const CountryRow: React.FC<{ country: Country }> = React.memo(({ country }) => {
  const { _id, country: countryName, ratio, count } = country;
  const iconName = useMemo(() => countryName?.toLowerCase(), [countryName]);
  const [flagSrc, setFlagSrc] = useState<string | null>(null);

  useEffect(() => {
    importFlag(iconName).then(setFlagSrc);
  }, [iconName]);

  return (
    <TableRow key={_id}>
      <TableCell className="flex font-medium py-3 gap-2 items-center">
        {flagSrc && (
          <img
            className="h-[24px] w-[24px]"
            src={flagSrc}
            alt={`${countryName} flag`}
            height={24}
            width={24}
          />
        )}
        {countryName}
      </TableCell>
      <TableCell>{ratio}</TableCell>
      <TableCell>{count}</TableCell>
    </TableRow>
  );
});

const CountryTable: React.FC<CountryTableProps> = ({
  tableData,
  className = "",
}) => {
  return (
    <div className={className}>
      <Card className="flex flex-col bg-white rounded-md px-4 pt-4 h-full">
        <div className="flex px-2 gap-2 flex-col">
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
            {tableData.map((country) => (
              <CountryRow key={country._id} country={country} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default React.memo(CountryTable);
