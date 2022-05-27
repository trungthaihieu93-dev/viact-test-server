export const getRandomNumeric = (): number => Math.floor(Math.random() * 10);

export const getRandomOTP = (charNum: number): string => {
  let otp = '';

  for (let i = 0; i < charNum; i++) {
    otp = `${otp}${getRandomNumeric()}`;
  }

  return otp;
};
