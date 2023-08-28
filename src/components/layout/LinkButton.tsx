import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
}

export function LinkButton({ to, children }: LinkButtonProps) {
  return (
    <Link
      className="bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-500 hover:text-yellow-500"
      to={to}
    >
      {children}
    </Link>
  );
}
