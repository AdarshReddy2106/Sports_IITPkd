// Centralized authorization logic to be used across components

export const superAdminEmails = [
  "102301018@smail.iitpkd.ac.in",
  "122301042@smail.iitpkd.ac.in",
];

export const eventAdminEmails = [
  "ace@iitpkd.ac.in",
];

export const checkUserAuthorization = (userEmail) => {
  if (!userEmail) return { isAuthorized: false, isSuperAdmin: false, isEventAdmin: false };
  
  const isSuperAdmin = superAdminEmails.includes(userEmail);
  const isEventAdmin = eventAdminEmails.includes(userEmail) || isSuperAdmin;
  const isAuthorized = isSuperAdmin || eventAdminEmails.includes(userEmail);
  
  return {
    isAuthorized,
    isSuperAdmin,
    isEventAdmin,
  };
};