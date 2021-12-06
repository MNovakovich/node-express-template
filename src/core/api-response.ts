export const apiResponse = async <T>(status: number, data: T) => {
  return {
    status,
    data,
  };
};
