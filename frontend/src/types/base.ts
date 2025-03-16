export type Output<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type SERVER_RESPONSE_STATUS = "success" | "error";
