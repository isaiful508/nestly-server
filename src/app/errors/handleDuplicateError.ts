/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSource, TReturnErrorResponse } from "../types/error";

const handleDuplicateError = (err:any): TReturnErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: '',
      message: err?.errorResponse?.errmsg,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
