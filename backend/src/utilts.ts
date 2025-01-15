export const random = (len:number)=>{
    const possibleChars = "qwertyuiopasdfghjklzxcvbnm1234567890"
  const length = possibleChars.length;
  let ans = "";
  for(let i=0;i<len;i++){
    ans+= possibleChars[Math.floor((Math.random())*length)]
  }
  return ans;
  
}