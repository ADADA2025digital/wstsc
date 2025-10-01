export default function SectionHeader({ title, className = "" }) {
  return (
    <div className={`container banner-bg p-3 mb-4 ${className}`}>
      <h4 className="text-white m-0">{title}</h4>
    </div>
  );
}
