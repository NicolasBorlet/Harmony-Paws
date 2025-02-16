export interface IOption {
  id: string;
  label: string;
  value: string;
}

export interface DropdownProps {
  options: IOption[];
  placeholder: string;
  onSelect: (option: IOption) => void;
}
