export const generateOtp = () => {
  const forgetPin = Math.floor(Math.random() * 10000);
  console.log(forgetPin);
  return forgetPin;
};
