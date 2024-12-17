import { createSelector } from "@reduxjs/toolkit";

export const selectorContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.loading;
export const selectIsError = (state) => state.contacts.error;
export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectorContacts, selectNameFilter],
  (contacts, filter) => {
    if (!filter.trim()) return contacts;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
