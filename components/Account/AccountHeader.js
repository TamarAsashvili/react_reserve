import { Header, Segment, Icon, Label } from 'semantic-ui-react'

function AccountHeader({ role, createdAt, email, name }) {
  return <>
    <Segment secondary inverted color='violet'>
      <Label color='teal'
        size='large'
        ribbon
        icon='privacy'
        style={{ textTransform: 'capitalize' }}
        content={role}
      />
      <Header inverted textAlign='center' as='h1' icon>
        <Icon name='user' />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {createdAt}</Header.Subheader>

      </Header>
    </Segment>
  </>;
}

export default AccountHeader;
