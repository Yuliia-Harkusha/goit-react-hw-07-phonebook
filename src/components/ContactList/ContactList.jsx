import { useSelector } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import { useDeleteContactMutation, useFetchContactsQuery } from 'redux/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFeatherAlt, FaRegTrashAlt } from 'react-icons/fa';
import {
  List,
  ListItem,
  ListItemPart,
  FeatherIcon,
  TrashIcon,
} from './ContactList.styled';
import { DefaultText } from 'components/App.styled';

export const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const { filter } = useSelector(state => getFilter(state));

  const onDeleteContact = id => {
    deleteContact(id);
    toast.info('The contact has been successfully deleted');
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter);
      return result;
    });
    return filteredContacts;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {!contacts && <DefaultText>Contact list is empty</DefaultText>}
      <List>
        {contacts &&
          filteredContacts.map(({ name, number, id }) => {
            return (
              <ListItem key={id}>
                <ListItemPart>
                  <FeatherIcon>
                    <FaFeatherAlt />
                  </FeatherIcon>
                  {name}: {number}
                </ListItemPart>
                <TrashIcon onClick={() => onDeleteContact(id)}>
                  <FaRegTrashAlt />
                </TrashIcon>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};
