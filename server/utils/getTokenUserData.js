const getTokenUserData = (user) => {
    return { name: user.username, userId: user._id, role: user.role }
  }
  
  export default getTokenUserData