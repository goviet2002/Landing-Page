import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface CertificateCardProps {
  title: string
  issuer: string
  icon: string
  color: string
  date?: string
  skills?: string[]
  logo?: string
}

const CertificateCard = ({ title, issuer, icon, color, date, skills, logo }: CertificateCardProps) => {
  const getBgColor = () => {
    switch (color) {
      case "cyan":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
      case "blue":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30"
      default:
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-[#1e293b] border-cyan-500/20 hover:border-cyan-500/40 w-full flex-shrink-0 h-[220px] flex flex-col">
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
        {logo ? (
          <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-cyan-500/30">
            <div className="w-full h-full flex items-center justify-center">
              <Image src={logo || "/placeholder.svg"} alt={issuer} width={40} height={40} className="object-contain" />
            </div>
          </div>
        ) : (
          <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-lg ${getBgColor()}`}>{icon}</div>
        )}
        <div>
          <h4 className="font-medium text-white text-base">{title}</h4>
          <p className="text-gray-400 text-sm">{issuer}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
        {date && <p className="text-gray-400 text-sm mb-2">{date}</p>}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className={`text-xs ${getBgColor()}`}>
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CertificateCard
