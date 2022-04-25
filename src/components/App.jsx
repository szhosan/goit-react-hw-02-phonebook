import React, { Component } from 'react';
import Section from './Section/Section';
import AddContactForm from './AddContactForm/AddContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import ContactSearch from './ContactSearch/ContactSearch';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  nameAlreadyExist(contacts, nameToAdd) {
    return contacts.find(
      contact => contact.name.toLowerCase() === nameToAdd.toLowerCase()
    );
  }

  formSubmitHandler = data => {
    this.setState(prevState => {
      if (this.nameAlreadyExist(prevState.contacts, data.name)) {
        alert(`${data.name} is already in contacts`);
        return;
      }
      return { contacts: [...prevState.contacts, { id: nanoid(), ...data }] };
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleSearchContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <Section title="Phonebook">
          <AddContactForm onSubmit={this.formSubmitHandler} />
        </Section>
        {contacts.length > 0 && (
          <Section title="Contacts">
            <ContactSearch value={filter} onChange={this.handleSearchContact} />
            <ContactsList
              contacts={this.getFilteredContacts()}
              onDeleteContact={this.onDeleteContact}
            />
          </Section>
        )}
      </>
    );
  }
}

export default App;
