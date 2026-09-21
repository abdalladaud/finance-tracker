import { Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInformation = ({
  name,
  email,
  setName,
  setEmail,
  isEditing,
  isSaving,
  onSave,
  onCancel,
}) => {
  return (
    <section className="p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-base font-semibold">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your name and email address.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="profile-name">
            Full Name
          </Label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="profile-name"
              value={name}
              disabled={!isEditing || isSaving}
              onChange={(event) => setName(event.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="profile-email">
            Email Address
          </Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="profile-email"
              type="email"
              value={email}
              disabled={!isEditing || isSaving}
              onChange={(event) => setEmail(event.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="bg-foreground text-background hover:bg-foreground/90"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default PersonalInformation;