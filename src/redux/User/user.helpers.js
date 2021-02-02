import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };
  console.log("i am here", auth.sendPasswordResetEmail(email, config));
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = { message: "Email not found. Please try again" };
        reject(err);
      });
  });
};

// export const handleResetPasswordAPI = (email) => {
//   const config = {
//     url: "http://localhost:3000/login",
//   };
//   return new Promise((resolve, reject) => {
//     auth
//       .sendPasswordResetEmail(email, config)
//       .then(() => {
//         resolve();
//       })
//       .catch(() => {
//         const err = { message: "Email not found. Please try again" };
//         reject(err);
//       });
//   });
// };
