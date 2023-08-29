import LogoFunc from './picture';

export default function MyButton({ count, onClick }) {
    return (
      <>
        <LogoFunc count={count}/>
        <button onClick={onClick}>
          Clicked {count} times
        </button>
      </>
    );
  }