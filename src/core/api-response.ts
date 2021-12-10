export const apiResponse = async <T>(status: number, data: T) => {
  return {
    status,
    data,
  };
};

export const serviceResponse = async <T>({ status, data, error }) => {
  return {
    status,
    data,
    error,
  };
};
