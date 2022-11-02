import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/api';
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

export const ContactList = ({ items }) => {
  const [deleteContact] = useDeleteContactMutation();

  const onDeleteContact = id => {
    deleteContact(id);
    toast.info('The contact has been successfully deleted');
  };

  const elements = items.map(({ name, number, id }) => {
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
  });
  return <List>{elements}</List>;
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
};
