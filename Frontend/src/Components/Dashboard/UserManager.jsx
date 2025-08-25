import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaKey, FaBell, FaShieldAlt, FaPalette, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserManager = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "John User",
    email: "john.user@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    department: "Development",
    position: "Software Developer",
    joinDate: "January 15, 2024",
    avatar: null
  });

  const [settings, setSettings] = useState({
    notifications: { email: true, push: false, sms: true },
    privacy: { profileVisibility: "public", showEmail: true, showPhone: false },
    theme: "light",
    language: "English"
  });

  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  const handleProfileUpdate = (field, value) => setUserProfile(prev => ({ ...prev, [field]: value }));
  const handleSaveProfile = () => { setIsEditing(false); alert("Profile updated successfully!"); };
  const handleCancelEdit = () => { setIsEditing(false); };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) return alert("New passwords don't match!");
    if (passwordData.newPassword.length < 6) return alert("Password must be at least 6 characters long!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully!");
  };

  const handleSettingChange = (category, key, value) => setSettings(prev => ({ ...prev, [category]: { ...prev[category], [key]: value } }));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setUserProfile(prev => ({ ...prev, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>
        <button onClick={() => navigate("/user-dashboard")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Dashboard</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FaEdit /><span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button onClick={handleSaveProfile} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><FaSave /><span>Save</span></button>
                  <button onClick={handleCancelEdit} className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"><FaTimes /><span>Cancel</span></button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                    {userProfile.avatar ? (<img src={userProfile.avatar} alt="Profile" className="w-32 h-32 rounded-full object-cover" />) : userProfile.name.charAt(0)}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                      <FaEdit />
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>
                {isEditing && <p className="text-sm text-gray-500">Click the edit icon to change photo</p>}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input type="text" value={userProfile.name} onChange={e => handleProfileUpdate('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  ) : (<p className="text-gray-900">{userProfile.name}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input type="email" value={userProfile.email} onChange={e => handleProfileUpdate('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  ) : (<p className="text-gray-900">{userProfile.email}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input type="tel" value={userProfile.phone} onChange={e => handleProfileUpdate('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  ) : (<p className="text-gray-900">{userProfile.phone}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <input type="text" value={userProfile.location} onChange={e => handleProfileUpdate('location', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  ) : (<p className="text-gray-900">{userProfile.location}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <p className="text-gray-900">{userProfile.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <p className="text-gray-900">{userProfile.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <p className="text-gray-900">{userProfile.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center"><FaKey className="mr-2 text-blue-600" />Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={passwordData.currentPassword} onChange={e => setPasswordData(p => ({ ...p, currentPassword: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10" placeholder="Enter current password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input type={showNewPassword ? "text" : "password"} value={passwordData.newPassword} onChange={e => setPasswordData(p => ({ ...p, newPassword: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10" placeholder="Enter new password" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">{showNewPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData(p => ({ ...p, confirmPassword: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Confirm new password" />
              </div>
            </div>
            <div className="mt-4"><button onClick={handlePasswordChange} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Change Password</button></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><FaBell className="mr-2 text-blue-600" />Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center"><input type="checkbox" checked={settings.notifications.email} onChange={e => handleSettingChange('notifications', 'email', e.target.checked)} className="mr-2" />Email Notifications</label>
              <label className="flex items-center"><input type="checkbox" checked={settings.notifications.push} onChange={e => handleSettingChange('notifications', 'push', e.target.checked)} className="mr-2" />Push Notifications</label>
              <label className="flex items-center"><input type="checkbox" checked={settings.notifications.sms} onChange={e => handleSettingChange('notifications', 'sms', e.target.checked)} className="mr-2" />SMS Notifications</label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><FaShieldAlt className="mr-2 text-blue-600" />Privacy</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
                <select value={settings.privacy.profileVisibility} onChange={e => handleSettingChange('privacy', 'profileVisibility', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="team">Team Only</option>
                </select>
              </div>
              <label className="flex items-center"><input type="checkbox" checked={settings.privacy.showEmail} onChange={e => handleSettingChange('privacy', 'showEmail', e.target.checked)} className="mr-2" />Show Email to Others</label>
              <label className="flex items-center"><input type="checkbox" checked={settings.privacy.showPhone} onChange={e => handleSettingChange('privacy', 'showPhone', e.target.checked)} className="mr-2" />Show Phone to Others</label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><FaPalette className="mr-2 text-blue-600" />Appearance</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select value={settings.theme} onChange={e => setSettings(prev => ({ ...prev, theme: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select value={settings.language} onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;

