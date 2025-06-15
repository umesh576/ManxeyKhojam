export const generateOtp = () => {
  const forgetPin = Math.floor(Math.random() * 100000);
  console.log(forgetPin);
  return forgetPin;
};
