import React from "react";
import { FaEnvelope, FaPhoneAlt, FaUserTag } from "react-icons/fa";
import coverPhoto from "../../assets/online-education-cover.jpg";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Helmet } from "react-helmet";

const UserProfile = () => {
  const { user } = useAuth();
  const { role } = useRole(user?.email);

  return (
    <div className="border-2 border-gray-300 rounded-xl p-10 bg-base-100">
      <Helmet>
        <title>Skill Spark | My profile</title>
      </Helmet>
      <div className="relative">
        {/* Cover Photo */}
        <img
          className="w-full h-64 object-cover rounded-2xl"
          src={coverPhoto}
          alt="Cover"
        />

        {/* Avatar + Info */}
        <div className="absolute left-1/2 -bottom-48 md:-bottom-40 lg:-bottom-28 transform -translate-x-1/2 text-center">
          <div className="avatar">
            <div className="w-32 rounded-full ring-4 ring-primary">
              <img src={user?.photoURL || "/default-avatar.png"} alt="User" />
            </div>
          </div>

          {/* Name + Role */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold">{user?.displayName}</h2>
            <div className="badge badge-primary flex items-center gap-1">
              <FaUserTag /> {role}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col 2xl:flex-row items-center justify-center gap-6 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaEnvelope /> {user?.email}
            </div>
            <div className="flex items-center gap-1">
              <FaPhoneAlt /> +880 123-456-789
            </div>
          </div>
        </div>
      </div>

      {/* Spacer below profile */}
      <div className="mt-40"></div>
    </div>
  );
};

export default UserProfile;
