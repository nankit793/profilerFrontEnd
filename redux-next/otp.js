export default async function getOTP(body) {
  const { userRegistration, isOTP, userid } = body;
  // mode: "cors",
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // userRegistration: userRegistration,
      // isOTP: isOTP,
      userid: userid,
    }),
  };
  const result = await fetch(
    `${process.env.BACKEND_URL}/user/forgotPassword/regenrateOTP`,
    requestOptions
  );
  return result;
}
