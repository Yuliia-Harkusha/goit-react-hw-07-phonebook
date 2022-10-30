import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/contactsSlice';
import { getFilter } from 'redux/selectors';
import { useFetchContactsQuery, useDeleteContactMutation } from 'redux/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormAddContact } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import {
  Container,
  Card,
  Title,
  Accent,
  ContactsCard,
  ContactsTitle,
  SearchInput,
  DefaultText,
} from './App.styled';

export const App = () => {
  const { data: contacts, isLoading, isSuccess } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    deleteContact(id);
    toast.info('The contact has been successfully deleted');
  };

  const handleChangeFilter = e => {
    dispatch(changeFilter(e.target.value));
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
        <SearchInput
          type="text"
          name="filter"
          onChange={handleChangeFilter}
          value={filter}
          placeholder="Search"
        />
        {contacts ? (
          <ContactList
            items={filteredContacts}
            removeContact={onDeleteContact}
          />
        ) : (
          <DefaultText>Contact list is empty</DefaultText>
        )}
      </ContactsCard>
      <ToastContainer autoClose={2000} theme="colored" />
    </Container>
  );
};
