import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchContactsQuery, useAddContactMutation } from 'redux/api';
import { FormItem, Input, Label, Button } from './ContactForm.styled';

export const FormAddContact = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [addContact] = useAddContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const isDuplicate = ({ name, number }) => {
    const result = contacts.find(
      item => item.name === name && item.number === number
    );
    return result;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isDuplicate({ name, number })) {
      toast.warn(`"${name}: ${number}" is already in contacts`);
    } else {
      toast.success('The contact has been successfully added');
      addContact({ id: nanoid(), name, number });
    }
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem>
        <Label htmlFor={nameId}>Name: </Label>
        <Input
          id={nameId}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          placeholder="Enter the name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormItem>
      <FormItem>
        <Label htmlFor={numberId}>Number: </Label>
        <Input
          id={numberId}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          placeholder="Enter the number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormItem>
      <Button type="submit">Add contact</Button>
      <ToastContainer autoClose={2000} theme="colored" />
    </form>
  );
};
