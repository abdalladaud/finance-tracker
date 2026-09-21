import { Card, CardContent } from "@/components/ui/card";

function AdminStatCard({ title, value, icon: Icon }) {
  return (
    <Card className="border-0 transition-transform duration-200 hover:-translate-y-0.5">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="text-2xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        {Icon && (
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Icon
              className="size-5 text-muted-foreground"
              strokeWidth={1.8}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminStatCard;