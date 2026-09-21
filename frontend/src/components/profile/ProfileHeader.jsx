import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

const ProfileHeader = ({
  user,
  isEditing,
  setIsEditing,
  profileFile,
  setProfileFile,
  isSaving,
}) => {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(
    user?.profileImage || ""
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (!profileFile) {
      setPreview(user?.profileImage || "");
      return;
    }

    const objectUrl = URL.createObjectURL(profileFile);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [profileFile, user?.profileImage]);

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setProfileFile(file);
  };

  return (
    <section className="p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* User */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarImage
              src={preview}
              alt={user?.name || "Profile"}
            />

            <AvatarFallback className="text-lg font-medium">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              {user?.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>

            {isEditing && (
              <div className="pt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={isSaving}
                >
                  <ImagePlus className="mr-2 h-4 w-4" />

                  {profileFile
                    ? "Change Photo"
                    : "Choose Photo"}
                </Button>

                {error && (
                  <p className="mt-2 text-xs text-destructive">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit */}
        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;