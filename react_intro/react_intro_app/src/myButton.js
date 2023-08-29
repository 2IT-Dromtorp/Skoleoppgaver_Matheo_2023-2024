import logoFunc from './picture';

export default function MyButton({ count, onClick }) {
  logoFunc({count})
    return (
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    );
  }