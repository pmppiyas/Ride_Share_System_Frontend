export const getDriverKey = (driver: Driver, index: number): string => {
  return `${driver._id}-${index}`;
};
