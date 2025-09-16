export default function Button({ className, children, type }) {
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
