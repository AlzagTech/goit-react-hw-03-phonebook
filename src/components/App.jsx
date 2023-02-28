import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './Container/Container';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  formSubmitHandle = data => {
    const savedContactsNames = this.state.contacts.map(contact => contact.name);

    if (savedContactsNames.includes(data.name)) {
      alert(`${data.name} is alredy in contacts`);
      return;
    }

    this.addContact(data);
  };

  handleFilterChange = event => {
    return this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const visibleContactsLength = visibleContacts.length;
    const contactsLength = this.state.contacts.length;
    // No results in your contacts
    return (
      <>
        <GlobalStyle />
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandle} />
        </Container>
        <Container>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.handleFilterChange} />
          {contactsLength === 0 ? (
            <p>You have no contacts yet...</p>
          ) : visibleContactsLength === 0 ? (
            <p>No results in your contacts...</p>
          ) : (
            <ContactsList
              contacts={visibleContacts}
              onRemoveContact={this.removeContact}
            />
          )}
        </Container>
      </>
    );
  }
}
