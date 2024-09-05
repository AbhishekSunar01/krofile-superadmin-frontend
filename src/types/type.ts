/* eslint-disable @typescript-eslint/no-explicit-any */
export type DataTableItem = {
  [key: string]: unknown;
};

export type ColumnDefinition<T extends DataTableItem> = {
  id: string;
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  cell?: (info: {
    row: { getValue: (key: keyof T) => any; original: T };
  }) => React.ReactNode;
};

export type DataTableProps<T extends DataTableItem> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  title: string;
};

export interface FilterOption {
  label: string;
  options: string[];
}

export interface FilterDropdownProps {
  onFilterChange: (selectedOptions: { [key: string]: string[] }) => void;
  filterOptions: FilterOption[];
}

export type BusinessData = {
  _id: string;
  businessName: string;
  industryType: string;
  subStatus: string;
  plan: string;
  regDate: string;
  country: string;
  customerName?: string;
  customerEmail?: string;
  customerContact?: string;
  customerType?: string;
  contactNumber?: string;
  location?: string;
  numberOfLocations?: number;
  website?: string;
  teamMembers?: number;
  expiryDate?: string;
  autoRenewal?: boolean;
};

export interface BusinessDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  businessData: BusinessData | null;
}

export interface SubscriptionDetailsProps {
  businessData: BusinessData;
}

export type SupportBusinessData = {
  _id: string;
  businessName: string;
  industryType: string;
  category: string;
  source: string;
  regDate: string;
  status: string;
  customerName?: string;
  reference?: string;
  note?: string;
};

export type ViewBusinessProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  availableStatuses: string[];
};

export type SupportTicketData = {
  _id: string;
  businessName: string;
  industryType: string;
  topic: string;
  subject: string;
  date: string;
  status: string;
  logo?: string;
  description?: string;
  image?: string[];
};

export type ViewTicketProps = {
  isTicketOpen: boolean;
  onBack: () => void;
  data: any;
};