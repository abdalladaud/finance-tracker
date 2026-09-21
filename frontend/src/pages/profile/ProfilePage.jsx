import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInformation from "@/components/profile/PersonalInformation";

import { Separator } from "@/components/ui/separator";
import { getCurrentUser, updateProfile } from "@/lib/api/authApi";
import useAuthStore from "@/lib/store/authStore";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [profileFile, setProfileFile] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const updateUser = useAuthStore((state) => state.updateUser);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getCurrentUser();
        const currentUser = data.user ?? data;

        setUser(currentUser);
        setName(currentUser.name ?? "");
        setEmail(currentUser.email ?? "");
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load your profile."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
  try {
    setIsSaving(true);
    setError("");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    if (profileFile) {
      formData.append("profileImage", profileFile);
    }

    const data = await updateProfile(formData);

    const updatedUser = data.user ?? data;

    // Update local Profile page
    setUser(updatedUser);
    setName(updatedUser.name ?? "");
    setEmail(updatedUser.email ?? "");
    setProfileFile(null);

    // Update global auth store
    updateUser(updatedUser);

    setIsEditing(false);
  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.message ||
        "Failed to update your profile."
    );
  } finally {
    setIsSaving(false);
  }
};

  const handleCancel = () => {
    if (!user) return;

    setName(user.name ?? "");
    setEmail(user.email ?? "");
    setProfileFile(null);
    setError("");
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and profile photo.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Profile Container */}
      <div className="rounded-xl border bg-card">
        <ProfileHeader
          user={user}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          profileFile={profileFile}
          setProfileFile={setProfileFile}
          isSaving={isSaving}
        />

        <Separator />

        <PersonalInformation
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          isEditing={isEditing}
          isSaving={isSaving}
          onSave={handleSaveProfile}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default ProfilePage;