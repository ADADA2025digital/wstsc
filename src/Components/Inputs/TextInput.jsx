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
  error,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        <span className="fw-bold">{label}</span> <span><i>{note}</i></span> {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={id}
        className={`form-control rounded-0 ${error ? 'is-invalid' : ''}`}
        type={type}
        value={value || ''}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {help && <div className="form-text">{help}</div>}
    </div>
  );
}