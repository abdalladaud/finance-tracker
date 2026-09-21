import CategoryList from "@/components/categories/CategoryList"

function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Categories
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View the available transaction categories
        </p>
      </div>

      <CategoryList />
    </div>
  )
}

export default CategoriesPage