export const useFormatDate = (date: Date, time: boolean) => {
  if (time) {
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour12: false,
      })
    );
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
};
