export default function TextInput({
  id,
  label,
  note,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  help,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        <span className="fw-bold">{label}</span> <span><i>{note}</i></span> {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={id}
        className="form-control rounded-0"
        type={type}
        value={value || ''}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      {help && <div className="form-text">{help}</div>}
    </div>
  );
}