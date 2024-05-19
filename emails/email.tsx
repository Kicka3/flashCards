import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

const logo = 'https://cdn-icons-png.flaticon.com/512/3813/3813681.png'
const urlToProject = 'https://google.com'
const projectWebName = 'Flashcards.com'
const recoverHref = 'http://localhost:3000/createNewPassword/##token##'

export default function FlashCardsPasswordRecover() {
  return (
    <Html>
      <Head />
      <Preview>FlashCard Password Recover</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img alt={"FlashCard's Logo"} height={'45'} src={logo} width={'75'} />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Dear, ##name##</Heading>
              <Text style={headerText}> To reset your password, please click the button below</Text>
              <Section style={recoverSection}>
                <Link href={recoverHref} style={button} target={'_blank'}>
                  Recover
                </Link>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Flashcards will never email you and ask you to disclose or verify your password,
                credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Flashcards
            <br />
            <Link href={urlToProject} style={link} target={'_blank'}>
              {projectWebName}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: 'rgb(23, 23, 23)',
  color: 'rgb(23, 23, 23)',
  width: '100%',
}

const container = {
  backgroundColor: 'rgb(23, 23, 23)',
  borderRadius: '4px',
  margin: '0 auto',
  padding: '20px',
}

const h1 = {
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
  textAlign: 'center' as const,
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  textDecoration: 'underline',
}

const text = {
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const imageSection = {
  alignItems: 'center',
  backgroundColor: 'rgb(76, 76, 76)',
  display: 'flex',
  justifyContent: 'center',
  padding: '20px 0',
}

const coverSection = { backgroundColor: 'rgb(51, 51, 51)' }

const upperSection = { padding: '25px 35px' }

const lowerSection = { padding: '25px 35px' }

const headerText = {
  ...text,
  fontSize: '16px',
  textAlign: 'center' as const,
}
const footerText = {
  ...text,
  fontSize: '12px',
  padding: '0 20px',
  textAlign: 'center' as const,
}

const recoverSection = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
}

const cautionText = { ...text, margin: '0px', textAlign: 'center' as const }

const button = {
  backgroundColor: `rgb(140, 97, 255)`,
  borderRadius: '4px',
  boxShadow: '0px 4px 18px 0px rgba(140, 97, 255, 0.35)',
  color: '#fff',
  cursor: 'pointer',
  display: 'block',
  fontSize: '15px',
  fontWeight: '600',
  padding: '11px 23px',
}
