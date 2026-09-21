import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AccountSecurity = () => {
  const handleChangePassword = () => {
    // Change password flow will be added later
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <h2 className="text-base font-semibold">
            Account Security
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your password and account security.
          </p>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Security Info */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <LockKeyhole className="h-5 w-5 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Password
              </p>

              <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                Change your password to keep your account secure.
              </p>
            </div>
          </div>

          {/* Action */}
          <Button
            type="button"
            variant="outline"
            onClick={handleChangePassword}
            className="w-full sm:w-auto"
          >
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSecurity;