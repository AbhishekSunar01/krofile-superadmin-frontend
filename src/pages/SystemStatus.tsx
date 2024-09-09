import { Card } from "../components/ui/card";
import PageLayout from "../layout/PageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const servicesStatus = [
  {
    id: "01.",
    serviceName: "Main System",
    status: "Online",
  },
  {
    id: "02.",
    serviceName: "Database",
    status: "Offline",
  },
  {
    id: "03.",
    serviceName: "AI",
    status: "Online",
  },
];

export default function SystemStatus() {
  return (
    <PageLayout
      title="System Status"
      description="Track the condition of your system’s features, keeping you informed of their online and offline states in real-time."
    >
      <Card className="w-full p-6 h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.N.</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Current Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesStatus.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.id}</TableCell>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell
                  className={
                    service.status === "Online"
                      ? "text-accentDarkGreen"
                      : "text-destructive"
                  }
                >
                  {service.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageLayout>
  );
}
