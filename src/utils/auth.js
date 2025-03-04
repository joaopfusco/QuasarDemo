const login = async (username, password) => {
  try {
    const response = await fakeApiLogin(username, password)
    if (response.success) {
      window.sessionStorage.setItem('authUser', username)
      return { success: true, message: 'Login successful!' }
    } else {
      return { success: false, message: 'Login failed: ' + response.message }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'An error occurred during login.' }
  }
}

const register = async (username, password, password2) => {
  if (password !== password2) {
    return { success: false, message: 'Passwords do not match!' }
  }

  try {
    const response = await fakeApiRegister(username, password)
    if (response.success) {
      window.sessionStorage.setItem('authUser', username)
      return { success: true, message: 'Registration successful!' }
    } else {
      return { success: false, message: 'Registration failed: ' + response.message }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'An error occurred during registration.' }
  }
}

const fakeApiLogin = (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'root' && password === 'root') {
        resolve({ success: true })
      } else {
        resolve({ success: false, message: 'Invalid credentials' })
      }
    }, 500)
  })
}

const fakeApiRegister = (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'root') {
        resolve({ success: false, message: 'Username is already taken.' })
      } else {
        const form = new FormData()
        form.append('username', username)
        form.append('password', password)
        resolve({ success: true })
      }
    }, 500)
  })
}

export { login, register }
