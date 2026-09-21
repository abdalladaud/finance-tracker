import {
  BookOpen,
  Car,
  Clapperboard,
  GraduationCap,
  HeartPulse,
  MoreHorizontal,
  Receipt,
  ShoppingBag,
  Utensils,
  Wallet,
} from "lucide-react"

const categories = [
  {
    name: "Food",
    icon: Utensils,
  },
  {
    name: "Transport",
    icon: Car,
  },
  {
    name: "Shopping",
    icon: ShoppingBag,
  },
  {
    name: "Bills",
    icon: Receipt,
  },
  {
    name: "Entertainment",
    icon: Clapperboard,
  },
  {
    name: "Health",
    icon: HeartPulse,
  },
  {
    name: "Education",
    icon: GraduationCap,
  },
  {
    name: "Salary",
    icon: Wallet,
  },
  {
    name: "Other",
    icon: MoreHorizontal,
  },
]

function CategoryList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = category.icon

        return (
          <div
            key={category.name}
            className="flex items-center gap-3 rounded-lg border bg-card p-4"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Icon className="size-4" strokeWidth={1.8} />
            </div>

            <p className="text-sm font-medium">
              {category.name}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryList