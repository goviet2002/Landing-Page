import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image?: string
}

const TestimonialCard = ({ quote, author, role, image }: TestimonialCardProps) => {
  return (
    <Card className="bg-[#1e293b] border-cyan-500/20 hover:border-cyan-500/40 transition-all overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-cyan-400/30 mb-4" />
        <p className="text-gray-300 italic mb-6 flex-grow text-justify">{quote}</p>
        <div className="flex items-center mt-auto">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-[#0f172a]">
            {image ? (
              <Image src={image || "/placeholder.svg"} alt={author} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-cyan-400 text-xl font-bold">
                {author.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className="font-medium text-white">{author}</h4>
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
