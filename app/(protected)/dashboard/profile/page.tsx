import { getProfile } from "@/data-access/actions";
import ProfileCard from "./profile-card";
import { NextPage } from "next";

const ProfilePage: NextPage = async () => {
  const res = await getProfile();
  console.log("res", res.meta?.data);

  if (res.error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-base text-red-500">{res.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <ProfileCard res={res.meta?.data} />
    </div>
  );
};

export default ProfilePage;
