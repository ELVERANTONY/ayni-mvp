export default function GlassCard({ children, className = '', hover = true, glow = false, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`glass rounded-2xl ${hover ? 'glass-hover' : ''} ${glow ? 'glow-border' : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
