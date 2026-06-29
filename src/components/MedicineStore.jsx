import { useState } from "react";

const medicines = [
  { id: 1, name: "Panadol Extra", category: "Pain Relief", price: 120, unit: "20 Tablets", icon: "💊", stock: "In Stock" },
  { id: 2, name: "Augmentin 625mg", category: "Antibiotic", price: 450, unit: "10 Tablets", icon: "💊", stock: "In Stock" },
  { id: 3, name: "Cough Syrup", category: "Cold & Flu", price: 180, unit: "100ml Bottle", icon: "🧴", stock: "In Stock" },
  { id: 4, name: "Vitamin C 1000mg", category: "Supplements", price: 350, unit: "30 Tablets", icon: "💊", stock: "In Stock" },
  { id: 5, name: "Insulin Pen", category: "Diabetes Care", price: 1200, unit: "1 Pen", icon: "💉", stock: "Limited Stock" },
  { id: 6, name: "Disprin", category: "Pain Relief", price: 60, unit: "10 Tablets", icon: "💊", stock: "In Stock" },
  { id: 7, name: "ORS Sachets", category: "First Aid", price: 90, unit: "5 Sachets", icon: "🧂", stock: "In Stock" },
  { id: 8, name: "Calpol Syrup", category: "Cold & Flu", price: 150, unit: "60ml Bottle", icon: "🧴", stock: "In Stock" },
];

const categories = ["All", "Pain Relief", "Antibiotic", "Cold & Flu", "Supplements", "Diabetes Care", "First Aid"];

export default function MedicineStore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filteredMedicines =
    activeCategory === "All"
      ? medicines
      : medicines.filter((m) => m.category === activeCategory);

  return (
    <section style={styles.section}>
      <style>{css}</style>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.badge}>💊 Medicine Store</span>
          <h2 style={styles.title}>Order Medicines Online</h2>
          <p style={styles.subtitle}>
            Genuine medicines delivered to your doorstep. Browse by category or search what you need.
          </p>
        </div>

        {/* Search bar */}
        <div style={styles.searchBar}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search medicines, brands, or categories..."
            style={styles.searchInput}
          />
        </div>

        {/* Category filters */}
        <div style={styles.categoryRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.categoryBtn,
                ...(activeCategory === cat ? styles.categoryBtnActive : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Medicine Grid */}
        <div style={styles.grid}>
          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="medicine-card"
              style={styles.card}
              onMouseEnter={() => setHoveredId(med.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={styles.cardImageWrap}>
                <span style={styles.cardIcon}>{med.icon}</span>
                <span
                  style={{
                    ...styles.stockBadge,
                    ...(med.stock === "Limited Stock" ? styles.stockLimited : {}),
                  }}
                >
                  {med.stock}
                </span>
              </div>

              <div style={styles.cardBody}>
                <span style={styles.cardCategory}>{med.category}</span>
                <h3 style={styles.cardName}>{med.name}</h3>
                <p style={styles.cardUnit}>{med.unit}</p>

                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>Rs. {med.price}</span>
                  <button style={styles.addBtn}>
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <p style={styles.emptyText}>No medicines found in this category.</p>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#F7FAFC",
    padding: "80px 20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  badge: {
    display: "inline-block",
    background: "#E6FFFA",
    color: "#0D9488",
    fontSize: "0.8rem",
    fontWeight: "700",
    padding: "6px 16px",
    borderRadius: "100px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#1A202C",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#718096",
    fontSize: "1rem",
    maxWidth: "500px",
    margin: "0 auto",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: "14px",
    padding: "14px 20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    maxWidth: "600px",
    margin: "0 auto 30px",
    gap: "10px",
  },
  searchIcon: {
    fontSize: "1.1rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "1rem",
    color: "#2D3748",
  },
  categoryRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "40px",
  },
  categoryBtn: {
    background: "white",
    border: "1px solid #E2E8F0",
    borderRadius: "100px",
    padding: "8px 18px",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#4A5568",
    cursor: "pointer",
    transition: "all 0.25s",
  },
  categoryBtnActive: {
    background: "#0D9488",
    borderColor: "#0D9488",
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.25s, box-shadow 0.25s",
    cursor: "default",
  },
  cardImageWrap: {
    background: "#F0FDFA",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardIcon: {
    fontSize: "3rem",
  },
  stockBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#C6F6D5",
    color: "#22543D",
    fontSize: "0.65rem",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "100px",
  },
  stockLimited: {
    background: "#FED7AA",
    color: "#9A3412",
  },
  cardBody: {
    padding: "18px",
  },
  cardCategory: {
    fontSize: "0.7rem",
    color: "#0D9488",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  cardName: {
    fontSize: "1.05rem",
    fontWeight: "700",
    color: "#1A202C",
    margin: "6px 0 4px",
  },
  cardUnit: {
    fontSize: "0.85rem",
    color: "#A0AEC0",
    marginBottom: "16px",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPrice: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#1A202C",
  },
  addBtn: {
    background: "#0D9488",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "0.8rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.25s",
  },
  emptyText: {
    textAlign: "center",
    color: "#A0AEC0",
    marginTop: "40px",
    fontSize: "1rem",
  },
};

const css = `
  .medicine-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.1) !important;
  }
  .medicine-card button:hover {
    background: #0B7A6F !important;
  }
  @media (max-width: 480px) {
    .medicine-card { font-size: 0.95rem; }
  }
`;
