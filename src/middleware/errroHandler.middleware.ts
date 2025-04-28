class customError extends Error {
  constructor(err: string) {
    super();
    console.log(err);
  }
}

export default customError;
