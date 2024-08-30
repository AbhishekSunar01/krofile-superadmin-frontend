import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";
import { ChevronLeft } from "lucide-react";

import filter from "../../../assets/svg/filter.svg";
import forward from "../../../assets/svg/forward.svg";

interface FilterOption {
  label: string;
  options: string[];
}

const filterOptions: FilterOption[] = [
  {
    label: "Subscription Status",
    options: [
      "Active",
      "Inactive",
      "Pending Confirmation",
      "Unsubscribed",
      "Trial",
      "On Hold",
      "Subscribed",
      "Expired",
      "Lapsed",
      "Suspended",
      "Overdue",
      "Rejected",
    ],
  },
  {
    label: "Plan",
    options: ["Basic", "Standard", "Premium", "Enterprise"],
  },
  {
    label: "Industry",
    options: [
      "Restaurant",
      "Retail",
      "Automotive",
      "Food and Beverage",
      "Beauty and Wellness",
      "Hospitality and Tourism",
      "Arts and Entertainment",
      "Professional Services",
      "Marketing and Advertising",
      "Sports and Fitness",
      "Utilities and Energy",
      "Transportation and Logistics",
      "Education and Training",
      "Financial Services",
      "Agriculture and Farming",
      "Information Technology and Software",
      "Media and Publishing",
      "Manufacturing",
      "Healthcare and Life Sciences",
      "Personal Care Services",
    ],
  },
];
interface FilterDropdownProps {
  onFilterChange: (selectedOptions: { [key: string]: string[] }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[];
  }>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFilterSelect = (filter: FilterOption) => {
    setSelectedFilter(filter);
  };

  const handleBack = () => {
    setSelectedFilter(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOptionToggle = (label: string, option: string) => {
    setSelectedOptions((prev) => {
      const optionsForLabel = prev[label] || [];
      const isSelected = optionsForLabel.includes(option);

      const updatedOptions = {
        ...prev,
        [label]: isSelected
          ? optionsForLabel.filter((opt) => opt !== option)
          : [...optionsForLabel, option],
      };

      onFilterChange(updatedOptions);

      return updatedOptions;
    });
  };

  const isOptionSelected = (label: string, option: string) => {
    return selectedOptions[label]?.includes(option) || false;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <img
          src={filter}
          alt="filter"
          className="h-[24px] w-[24px] cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] gap-2 p-2" align="end">
        {selectedFilter ? (
          <div className="overflow-y-auto max-h-[420px] overflow-x-hidden">
            <DropdownMenuItem
              onSelect={(e: Event) => e.preventDefault()}
              onClick={handleBack}
              className="font-semibold"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {selectedFilter.options.map((option, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={(e: Event) => e.preventDefault()}
                onClick={() => handleOptionToggle(selectedFilter.label, option)}
                className="flex items-center space-x-2 "
              >
                <Checkbox
                  id={`${selectedFilter.label}-${option}`}
                  checked={isOptionSelected(selectedFilter.label, option)}
                />
                <label
                  htmlFor={`${selectedFilter.label}-${option}`}
                  className="text-sm cursor-pointer flex-grow"
                >
                  {option}
                </label>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          <>
            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
            <div className="px-3">
              <DropdownMenuSeparator />
              {filterOptions.map((filter, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={(e: Event) => e.preventDefault()}
                  onClick={() => handleFilterSelect(filter)}
                  className="flex items-center justify-between gap-2 py-[6px] text-sm font-normal "
                >
                  {filter.label} <img src={forward} alt="forward" />
                </DropdownMenuItem>
              ))}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
