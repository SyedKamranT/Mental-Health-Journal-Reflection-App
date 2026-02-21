import { Card, CardContent, CardHeader } from "../ui/card";
import { ReactNode } from "react";

interface InsightCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  accentColor: string;
  borderColor: string;
}

export function InsightCard({ title, icon, children, accentColor, borderColor }: InsightCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${accentColor} ${borderColor}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-card flex items-center justify-center">
            {icon}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
