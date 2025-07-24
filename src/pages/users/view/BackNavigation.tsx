import { Link } from "react-router";

interface BackNavigationProps {
  to: string;
  label: string;
}

function BackNavigation({ to, label }: BackNavigationProps) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center text-sm text-gray-medium mb-4 space-x-2"
    >
      <span className="group-hover:-translate-x-1 transition-transform duration-300 ease-out">
        ←
      </span>
      <span className="group-hover:underline transition-all duration-300 ease-out">
        {label}
      </span>
    </Link>
  );
}

export default BackNavigation; 