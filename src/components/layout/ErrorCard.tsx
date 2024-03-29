interface ErrorCardProps {
  message: string;
}

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="text-center text-red-900 bg-red-200 border border-red-900 mt-6 p-4 rounded-md">
      {message}
    </div>
  );
}
