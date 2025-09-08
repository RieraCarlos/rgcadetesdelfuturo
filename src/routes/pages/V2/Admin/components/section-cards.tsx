import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
            <CardDescription>Recaudación Mensual</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $1,240.00
            </CardTitle>
            <CardAction>
                <Badge variant="outline">
                <IconTrendingUp />
                    17,7%
                </Badge>
            </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                Tendencia al alza este mes <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
                Recaudación dentro del 70% total
            </div>
            </CardFooter>
        </Card>
        <Card className="@container/card">
            <CardHeader>
            <CardDescription>Estudiantes Registrados</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                500
            </CardTitle>
            <CardAction>
                <Badge variant="outline">
                <IconTrendingDown />
                20%
                </Badge>
            </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                Bajó un 20% este período <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">
                Diferencia con el periodo anterior 
            </div>
            </CardFooter>
        </Card>
        <Card className="@container/card">
            <CardHeader>
            <CardDescription>Estudiantes por cancelar</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                438
            </CardTitle>
            <CardAction>
                <Badge variant="outline">
                <IconTrendingDown />
                87,6%
                </Badge>
            </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                Poca recaudación <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">Necesita intervención</div>
            </CardFooter>
        </Card>
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>% de alumnos cancelados</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    12,4%
                </CardTitle>
                <CardAction>
                    <Badge variant="outline">
                    <IconTrendingDown />
                    20%
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
                Bajo rendimiento <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">Necesita intervención</div>
            </CardFooter>
        </Card>
    </div>
  )
}
