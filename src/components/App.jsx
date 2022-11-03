import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormAddContact } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import {
  Container,
  Card,
  Title,
  Accent,
  ContactsCard,
  ContactsTitle,
} from './App.styled';

export const App = () => {
  return (
    <Container>
      <Card>
        <Title>
          Phone<Accent>book</Accent>
        </Title>
        <FormAddContact />
      </Card>

      <ContactsCard>
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        <ContactList />
      </ContactsCard>
      <ToastContainer autoClose={2000} theme="colored" />
    </Container>
  );
};
