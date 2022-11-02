import { useFetchContactsQuery } from 'redux/api';
import { useState } from 'react';
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
  DefaultText,
} from './App.styled';

export const App = () => {
  const { data: contacts } = useFetchContactsQuery();

  const [filter, setFilter] = useState('');

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter);
      return result;
    });
    return filteredContacts;
  };

  const filteredContacts = getFilteredContacts();

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
        <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
        {contacts ? (
          <ContactList items={filteredContacts} />
        ) : (
          <DefaultText>Contact list is empty</DefaultText>
        )}
      </ContactsCard>
      <ToastContainer autoClose={2000} theme="colored" />
    </Container>
  );
};
