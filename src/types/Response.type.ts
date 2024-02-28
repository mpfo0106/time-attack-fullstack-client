export type Response<D = null> =
  | {
      success: true;
      result: D;
      error: null;
    }
  | {
      success: false;
      result: null;
      error: {
        message: string;
      };
    };
