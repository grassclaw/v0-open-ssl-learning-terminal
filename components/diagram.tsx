import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { diagrams } from "@/lib/diagram-data"

interface DiagramProps {
  diagramType: string
}

export default function Diagram({ diagramType }: DiagramProps) {
  const diagram = diagrams[diagramType]

  if (!diagram) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{diagram.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center p-4">{diagram.content}</div>
      </CardContent>
    </Card>
  )
}
