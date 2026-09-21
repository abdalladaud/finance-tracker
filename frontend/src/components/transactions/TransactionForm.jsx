import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TransactionForm({
  formValues,
  onChange,
  onSubmit,
  isLoading = false,
  isEditing = false,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>

        <Input
          id="title"
          name="title"
          value={formValues.title}
          onChange={onChange}
          placeholder="e.g. Salary"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>

          <Input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={formValues.amount}
            onChange={onChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>

          <Select
            value={formValues.type}
            onValueChange={(value) =>
              onChange({
                target: {
                  name: "type",
                  value,
                },
              })
            }
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="expense">Expense</SelectItem>

              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>

          <Select
            value={formValues.category}
            onValueChange={(value) =>
              onChange({
                target: {
                  name: "category",
                  value,
                },
              })
            }
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>

          <Input
            id="date"
            name="date"
            type="date"
            value={formValues.date}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-foreground px-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:px-4 sm:text-sm"
        >
          {isLoading
            ? isEditing
              ? "Saving..."
              : "Adding..."
            : isEditing
              ? "Save changes"
              : "Add transaction"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
