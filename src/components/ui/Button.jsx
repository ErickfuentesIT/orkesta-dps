export default function Button({
  className,
  children,
  type,
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
