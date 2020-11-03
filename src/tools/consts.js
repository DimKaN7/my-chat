export const pages = ['Chats', 'Friends', 'Settings'];

export const titles = (isSignUp) => {
  return {
    header: isSignUp ? 'Register' : 'Login',
    description: isSignUp ? 'Please, enter email, password and it`s confirmation to sign up.' : 'Please, enter your email and password to sign in.',
    button: isSignUp ? 'Sign up' : 'Sign in',
    tip: isSignUp ? 'Already have an account?' : 'Don`t have an account?',
    link: isSignUp ? '/signIn' : '/signUp',
  }
}

export const buttonsStyle = {
  link: {
    textDecoration: 'none',
  },
  blue: {
    background: 'linear-gradient(50deg, rgba(4,121,251,1) 0%, rgba(51,147,255,1) 100%)',
    border: 'none',
    color: 'white',
  },
  white: {
    background: 'white',
    border: '1px solid rgba(0, 0, 0, 0.25)',
    color: 'black',
  },
  red: {
    background: 'red',
    border: 'none',
    color: 'white',
  }
}

// export const settingsButtonsStyle = {
//   editProfile: {
//     background: 'linear-gradient(50deg, rgba(4,121,251,1) 0%, rgba(51,147,255,1) 100%)',
//     border: 'none',
//     color: 'white',
//   },
//   logout: {
//     background: 'white',
//     border: '1px solid rgba(0, 0, 0, 0.25)',
//     color: 'black',
//   },
// }