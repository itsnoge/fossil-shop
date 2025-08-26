import { LoaderCircle } from "lucide-react"

export default function LoadingCircle({ size = 48 }: { size?: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className="animate-spin text-gray-800" size={size} />
    </div>
  )
}
