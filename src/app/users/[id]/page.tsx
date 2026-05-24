import { notFound } from "next/navigation";

import { userService } from "@/api/userService";
import { PublicProfileContent } from "@/app/users/[id]/PublicProfileContent";

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = await params;

  try {
    const profile = await userService.getUserById(id);

    return <PublicProfileContent profile={profile} />;
  } catch {
    notFound();
  }
}