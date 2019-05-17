import { white } from './colors';

export const getNavigationOptions = (title) => ({
  title: title,
  headerTintColor: 'black',
  headerStyle: {
    backgroundColor: white,
  }
});

export const generateId = () => Math.random().toString(36).substring(2)
  + (new Date()).getTime().toString(36);