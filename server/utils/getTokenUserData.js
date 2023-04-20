const getTokenUserData = (user) => {
    return { username: user.username, userId: user._id, role: user.role }
  }
  
  export default getTokenUserData