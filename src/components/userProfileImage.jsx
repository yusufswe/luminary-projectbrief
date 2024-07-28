"use client";
import { ProfileAction } from "@/app/(profile)/profile/action.js";

export const UserProfileImage = ({ user }) => {
  const [photoUrl, setPhotoUrl] = useState(`${process.env.R2_PUBLIC_URL}/brief-project-ai/${user.id}/${user.photoUrl}`);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const photo = await ProfileAction(null, formData);
        setPhotoUrl(`${photo.photoUrl}`);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <form className="space-y-3 flex flex-col items-center">
      <div className="w-24 h-24 md:w-32 md:h-32 relative">
        <img
          alt="profile image"
          src={photoUrl}
          className="bg-red-800 rounded-full object-cover w-full h-full"
        />
      </div>
      <label className="w-full bg-transparent text-center text-white font-semibold cursor-pointer text-sm md:text-base">
        Upload Photo
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </label>
    </form>
  );
};
