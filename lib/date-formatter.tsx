export const sliceDate = (dateValue: string) => {
  return new Date(dateValue).toLocaleDateString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};
