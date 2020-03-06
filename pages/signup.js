import React from 'react';
import { Form, Button, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';



const INITIAL_USER = {
  name: "",
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
      //make requast to signup user
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      await axios.post(url, payload)

    } catch (error) {
      catchErrors(error, setError)

    } finally {
      setLoading(false)
    }
  }


  return <>
    <Message attached icon='settings' header='Get Started' content='Create a New Account' color='teal' />
    <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
      <Message
        error
        header='Ooops!'
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon='user'
          iconPosition='left'
          label='Name'
          placeholder='Name'
          name='name'
          value={user.name}
          onChange={handleChange}
        />
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
        <Button disabled={disabled || loading} icon='signup' color='orange' type='submit' content='Signup' />
      </Segment>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help' />
      Existing user?{" "}
      <Link href='/login'>
        <a>
          Log in here
</a>
      </Link>{" "}instead.
    </Message>
  </>;
}

export default Signup;
