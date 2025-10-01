export default function Checkbox({
  id,
  label,
  note,
  checked,
  onChange,
  required = false,
}) {
  return (
    <div className="form-check mb-3">
      <input
        id={id}
        className="form-check-input"
        type="checkbox"
        checked={checked || false}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="form-label fw-bold">
        <span className="fw-bold">{label}</span> <span><i>{note}</i></span>{" "}
        {required && <span className="text-danger">*</span>}
      </label>
    </div>
  );
}