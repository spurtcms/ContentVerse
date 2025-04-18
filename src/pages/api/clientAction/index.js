export const login_token = () => {
  if (typeof window !== 'undefined' && window.localStorage){
    const token = localStorage.getItem("token");
    return token;
  }
};

export const uniqueId = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
  const Id = localStorage.getItem("Id");
  return Id;
  }
};
export const nameString = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
  const NameString = localStorage.getItem("NameString");
  return NameString;
  }
};
// export const login_token = () => {
//     if (typeof window !== 'undefined' && window.sessionStorage) {
//         const Token = sessionStorage.getItem("token");
//         return Token;
//     }
//     return null; // or handle the case when sessionStorage is not available
// }
