export function GalaxyBackground() {
  return (
    <div className="floating-blobs-bg">
      {/* Soft Floating Blobs with beige and green colors */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="floating-blob" />
      ))}
    </div>
  );
}