import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  FolderKanban,
  Home,
  Layers,
  Mail,
  Maximize2,
  Menu,
  Moon,
  Sun,
  X,
  type LucideProps,
} from "lucide-react";

type IconProps = LucideProps;

export function ArrowRightIcon({ className = "size-4", ...props }: IconProps) {
  return <ArrowRight aria-hidden className={className} {...props} />;
}

export function ArrowDownIcon({ className = "size-4", ...props }: IconProps) {
  return <ArrowDown aria-hidden className={className} {...props} />;
}

export function ArrowUpRightIcon({
  className = "size-3.5",
  ...props
}: IconProps) {
  return <ArrowUpRight aria-hidden className={className} {...props} />;
}

export function ChevronDownIcon({ className = "size-4", ...props }: IconProps) {
  return <ChevronDown aria-hidden className={className} {...props} />;
}

export function ChevronLeftIcon({ className = "size-4", ...props }: IconProps) {
  return <ChevronLeft aria-hidden className={className} {...props} />;
}

export function ChevronRightIcon({
  className = "size-4",
  ...props
}: IconProps) {
  return <ChevronRight aria-hidden className={className} {...props} />;
}

export function CloseIcon({ className = "size-4", ...props }: IconProps) {
  return <X aria-hidden className={className} {...props} />;
}

export function ExpandIcon({ className = "size-3.5", ...props }: IconProps) {
  return <Maximize2 aria-hidden className={className} {...props} />;
}

export function HomeIcon({ className = "size-4", ...props }: IconProps) {
  return <Home aria-hidden className={className} {...props} />;
}

export function FolderIcon({ className = "size-4", ...props }: IconProps) {
  return <FolderKanban aria-hidden className={className} {...props} />;
}

export function BriefcaseIcon({ className = "size-4", ...props }: IconProps) {
  return <Briefcase aria-hidden className={className} {...props} />;
}

export function LayersIcon({ className = "size-4", ...props }: IconProps) {
  return <Layers aria-hidden className={className} {...props} />;
}

export function MailIcon({ className = "size-4", ...props }: IconProps) {
  return <Mail aria-hidden className={className} {...props} />;
}

export function FileIcon({ className = "size-4", ...props }: IconProps) {
  return <FileText aria-hidden className={className} {...props} />;
}

export function MenuIcon({ className = "size-4", ...props }: IconProps) {
  return <Menu aria-hidden className={className} {...props} />;
}

export function SunIcon({ className = "size-4", ...props }: IconProps) {
  return <Sun aria-hidden className={className} {...props} />;
}

export function MoonIcon({ className = "size-4", ...props }: IconProps) {
  return <Moon aria-hidden className={className} {...props} />;
}

export function CopyIcon({ className = "size-3.5", ...props }: IconProps) {
  return <Copy aria-hidden className={className} {...props} />;
}

export function CheckIcon({ className = "size-3.5", ...props }: IconProps) {
  return <Check aria-hidden className={className} {...props} />;
}
