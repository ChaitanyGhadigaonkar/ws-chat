export type Output<T> = {
  success: boolean;
  message?: string;
} & T;

export type SERVER_RESPONSE_STATUS = "success" | "failed";
