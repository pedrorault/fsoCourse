const bcrypt = require('bcrypt')

const hashUser = async (user) => {
  const newUser = {...user}
  if(user.password){
    const saltRounds = 10
    const passHash = await bcrypt.hash(newUser.password, saltRounds)
    delete newUser.password
    newUser['passwordHash'] = passHash 
  }else{
    console.error('Error: User has no password field')
  }  
  return newUser
}

const usersDefault = [
  {
    username:'pedrorault',
    name:'Pedro',
    password:'sajdnuiann'
  },
  {
    username:'JunjiIto',
    name:'Jorge',
    password:'289103u8S&A'
  },
  {
    username:'Akira',
    name:'Marcio',
    password:'pokeabn'
  }
]


module.exports = { hashUser, usersDefault }