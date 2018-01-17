export default function ustawienia(state={}, action={}) {
  switch (action.type) {
    case 'ODCZYT_USTAWIEN':
      return {...action.data};
    default:
      return state;
  }
}
