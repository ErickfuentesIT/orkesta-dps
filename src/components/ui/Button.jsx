export default function Button({
  className,
  children,
  type,
  disabled = false,
}) {
  return (
    <button className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
