import { useEffect, useRef, useState } from "react";
import { Camera, Trash2, Upload } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

const ProfilePhoto = ({
  user,
  profileFile,
  setProfileFile,
  isSaving,
  onSave,
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

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setProfileFile(file);
  };

  const handleRemove = () => {
    setProfileFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-base font-semibold">
          Profile Photo
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Add or change your profile picture.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Preview */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={preview}
              alt={user?.name || "Profile"}
            />

            <AvatarFallback>
              <Camera className="h-5 w-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium">
              Profile picture
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG or WEBP · Maximum 5MB
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
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
            onClick={() => fileInputRef.current?.click()}
            disabled={isSaving}
          >
            <Upload className="mr-2 h-4 w-4" />

            {profileFile ? "Change Photo" : "Choose Photo"}
          </Button>

          {profileFile && (
            <>
              <Button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isSaving ? "Saving..." : "Save Photo"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleRemove}
                disabled={isSaving}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />

                Remove
              </Button>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
    </section>
  );
};

export default ProfilePhoto;