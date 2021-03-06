import React from 'react'
import { Form, Button, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import { handleLogin } from '../utils/auth'


const INITIAL_USER = {
  email: "",
  password: ""
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])


  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))

  }

  async function handleSubmit() {
    event.preventDefault()
    try {
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload);
      handleLogin(response.data);
      //make requast to signup user

    } catch (error) {
      catchErrors(error, setError)

    } finally {
      setLoading(false)
    }
  }


  return <>
    <Message attached icon='privacy' header='Welcome back' content='Log in with email and password' color='blue' />
    <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
      <Message
        error
        header='Ooops!'
        content={error}
      />
      <Segment>

        <Form.Input
          fluid
          icon='envelope'
          iconPosition='left'
          label='Email'
          placeholder='Email'
          type='email'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          label='Password'
          type='password'
          placeholder='Password'
          value={user.password}
          name='password'
          onChange={handleChange}
        />
        <Button disabled={disabled || loading} icon='sign in' color='orange' type='submit' content='Log In' />
      </Segment>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help' />
      New user?{" "}
      <Link href='/signup'>
        <a>
          Sign up here
</a>
      </Link>{" "}instead.
    </Message>
  </>;
}

export default Signup;
