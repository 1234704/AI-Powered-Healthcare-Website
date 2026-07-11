import { useState } from "react";

const medicines = [
  { id: 1, name: "Panadol Extra", category: "Pain Relief", price: 120, unit: "20 Tablets", icon: "💊", stock: "In Stock", brand: "GSK", dosage: "1-2 tablets every 4-6 hours. Max 8 tablets in 24 hours.", description: "Panadol Extra provides fast and effective relief from headaches, toothaches, backaches, and fever. Contains paracetamol 500mg + caffeine 65mg.", sideEffects: "Nausea, allergic reactions (rare). Do not exceed recommended dose.", prescription: "Not Required" },
  { id: 2, name: "Augmentin 625mg", category: "Antibiotic", price: 450, unit: "10 Tablets", icon: "💊", stock: "In Stock", brand: "GSK", dosage: "1 tablet twice daily with meals for 5-7 days.", description: "Broad-spectrum antibiotic used to treat bacterial infections including respiratory tract, skin, and urinary tract infections.", sideEffects: "Diarrhea, nausea, skin rash. Avoid if allergic to penicillin.", prescription: "Required" },
  { id: 3, name: "Cough Syrup", category: "Cold & Flu", price: 180, unit: "100ml Bottle", icon: "🧴", stock: "In Stock", brand: "Reckitt", dosage: "10ml three times daily. Shake well before use.", description: "Effective relief from dry and productive cough with dual-action cough suppression and mucus thinning.", sideEffects: "Drowsiness, dizziness. Avoid driving after use.", prescription: "Not Required" },
  { id: 4, name: "Vitamin C 1000mg", category: "Supplements", price: 350, unit: "30 Tablets", icon: "💊", stock: "In Stock", brand: "HealthVit", dosage: "1 tablet daily with water after meals.", description: "High-dose Vitamin C supplement to boost immunity, promote skin health, and provide antioxidant protection.", sideEffects: "Stomach upset if taken on empty stomach.", prescription: "Not Required" },
  { id: 5, name: "Insulin Pen", category: "Diabetes Care", price: 1200, unit: "1 Pen", icon: "💉", stock: "Limited Stock", brand: "Novo Nordisk", dosage: "As prescribed by your doctor.", description: "Pre-filled insulin pen for convenient and accurate insulin delivery for Type 1 and Type 2 diabetes patients.", sideEffects: "Hypoglycemia, injection site reactions. Monitor blood sugar regularly.", prescription: "Required" },
  { id: 6, name: "Disprin", category: "Pain Relief", price: 60, unit: "10 Tablets", icon: "💊", stock: "In Stock", brand: "Reckitt", dosage: "1-2 tablets dissolved in water every 4-6 hours.", description: "Aspirin-based effervescent tablet for fast pain relief, fever reduction, and mild anti-inflammatory action.", sideEffects: "Stomach irritation, not recommended for children under 12.", prescription: "Not Required" },
  { id: 7, name: "ORS Sachets", category: "First Aid", price: 90, unit: "5 Sachets", icon: "🧂", stock: "In Stock", brand: "Servier", dosage: "Dissolve 1 sachet in 1 litre of clean water.", description: "Oral Rehydration Salts for rapid rehydration during diarrhea, vomiting, or dehydration. WHO formula.", sideEffects: "None when used as directed. Safe for all ages.", prescription: "Not Required" },
  { id: 8, name: "Calpol Syrup", category: "Cold & Flu", price: 150, unit: "60ml Bottle", icon: "🧴", stock: "In Stock", brand: "GSK", dosage: "Children 6-12 years: 10ml every 4-6 hours. Max 4 doses in 24 hours.", description: "Paracetamol-based syrup for children with pleasant strawberry flavour for gentle fever and pain relief.", sideEffects: "Rare allergic reactions. Do not exceed recommended dose.", prescription: "Not Required" },
];

const categories = ["All", "Pain Relief", "Antibiotic", "Cold & Flu", "Supplements", "Diabetes Care", "First Aid"];

export default function MedicineStore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [removedId, setRemovedId] = useState(null);

  const filteredMedicines = medicines.filter((m) => {
    const matchCategory = activeCategory === "All" || m.category === activeCategory;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (med, e) => {
    e?.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((i) => i.id === med.id);
      if (existing) return prev.map((i) => i.id === med.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...med, qty: 1 }];
    });
    setAddedId(med.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const removeItem = (id) => {
    setRemovedId(id);
    setTimeout(() => {
      setCart((prev) => prev.filter((i) => i.id !== id));
      setRemovedId(null);
    }, 350);
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <section style={styles.section}>
      <style>{css}</style>

      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>💊 Medicine Store</span>
          <h2 style={styles.title}>Order Medicines Online</h2>
          <p style={styles.subtitle}>Genuine medicines delivered to your doorstep.</p>
        </div>

        <div style={styles.topRow}>
          <div style={styles.searchBar}>
            <span>🔍</span>
            <input type="text" placeholder="Search medicines..." value={search}
              onChange={(e) => setSearch(e.target.value)} style={styles.searchInput} />
            {search && <button onClick={() => setSearch("")} style={styles.clearBtn}>✕</button>}
          </div>
          <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
            🛒 Cart
            {cartCount > 0 && <span style={styles.cartCount}>{cartCount}</span>}
          </button>
        </div>

        <div style={styles.categoryRow}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ ...styles.categoryBtn, ...(activeCategory === cat ? styles.categoryBtnActive : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredMedicines.map((med) => (
            <div key={med.id} className="medicine-card" style={styles.card} onClick={() => setSelectedMedicine(med)}>
              <div style={styles.cardImageWrap}>
                <span style={styles.cardIcon}>{med.icon}</span>
                <span style={{ ...styles.stockBadge, ...(med.stock === "Limited Stock" ? styles.stockLimited : {}) }}>
                  {med.stock}
                </span>
              </div>
              <div style={styles.cardBody}>
                <span style={styles.cardCategory}>{med.category}</span>
                <h3 style={styles.cardName}>{med.name}</h3>
                <p style={styles.cardUnit}>{med.unit} • {med.brand}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>PKR {med.price}</span>
                  <button
                    style={{ ...styles.addBtn, ...(addedId === med.id ? styles.addBtnSuccess : {}) }}
                    onClick={(e) => addToCart(med, e)}
                  >
                    {addedId === med.id ? "✓ Added!" : "+ Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && <p style={styles.emptyText}>No medicines found.</p>}
      </div>

      {selectedMedicine && (
        <div style={styles.modalOverlay} onClick={() => setSelectedMedicine(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedMedicine(null)}>✕</button>
            <div style={styles.modalTop}>
              <div style={styles.modalIconWrap}><span style={styles.modalIcon}>{selectedMedicine.icon}</span></div>
              <div>
                <span style={styles.modalCategory}>{selectedMedicine.category}</span>
                <h2 style={styles.modalName}>{selectedMedicine.name}</h2>
                <p style={styles.modalBrand}>by {selectedMedicine.brand} • {selectedMedicine.unit}</p>
                <div style={styles.modalBadgeRow}>
                  <span style={styles.modalStock}>{selectedMedicine.stock}</span>
                  <span style={{ ...styles.prescriptionBadge, ...(selectedMedicine.prescription === "Required" ? styles.prescriptionRequired : {}) }}>
                    {selectedMedicine.prescription === "Required" ? "🔒 Prescription Required" : "✅ No Prescription"}
                  </span>
                </div>
              </div>
            </div>
            <div style={styles.modalDivider} />
            <div style={styles.modalSection}><h4 style={styles.modalSectionTitle}>📋 Description</h4><p style={styles.modalText}>{selectedMedicine.description}</p></div>
            <div style={styles.modalSection}><h4 style={styles.modalSectionTitle}>💡 Dosage</h4><p style={styles.modalText}>{selectedMedicine.dosage}</p></div>
            <div style={styles.modalSection}><h4 style={styles.modalSectionTitle}>⚠️ Side Effects</h4><p style={styles.modalText}>{selectedMedicine.sideEffects}</p></div>
            <div style={styles.modalFooter}>
              <div>
                <p style={styles.modalPriceLabel}>Price</p>
                <p style={styles.modalPrice}>PKR {selectedMedicine.price}</p>
              </div>
              <button
                style={{ ...styles.addCartBtn, ...(addedId === selectedMedicine.id ? styles.addBtnSuccess : {}) }}
                onClick={() => addToCart(selectedMedicine)}
              >
                {addedId === selectedMedicine.id ? "✓ Added!" : "🛒 Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div style={styles.modalOverlay} onClick={() => setShowCart(false)}>
          <div style={styles.cartSidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.cartHeader}>
              <h3 style={styles.cartTitle}>🛒 My Cart ({cartCount} items)</h3>
              <button style={styles.closeBtn} onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <span style={{ fontSize: "3rem" }}>🛒</span>
                <p style={{ color: "#A0AEC0", marginTop: "12px" }}>Your cart is empty!</p>
              </div>
            ) : (
              <>
                <button style={styles.clearAllBtn} onClick={clearCart}>🗑️ Clear All</button>

                <div style={styles.cartItems}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        ...styles.cartItem,
                        opacity: removedId === item.id ? 0 : 1,
                        transform: removedId === item.id ? "translateX(30px)" : "translateX(0)",
                        transition: "all 0.35s ease",
                      }}
                    >
                      <span style={styles.cartItemIcon}>{item.icon}</span>
                      <div style={styles.cartItemInfo}>
                        <p style={styles.cartItemName}>{item.name}</p>
                        <p style={styles.cartItemUnit}>{item.unit}</p>
                        <p style={styles.cartItemPrice}>PKR {item.price * item.qty}</p>
                      </div>
                      <div style={styles.cartItemRight}>
                        <div style={styles.qtyControls}>
                          <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                          <span style={styles.qtyNum}>{item.qty}</span>
                          <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.cartFooter}>
                  <div style={styles.cartTotal}>
                    <span>Total ({cartCount} items)</span>
                    <span style={styles.cartTotalAmount}>PKR {cartTotal}</span>
                  </div>
                  <button style={styles.checkoutBtn}>Proceed to Checkout →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: { background: "#F7FAFC", padding: "80px 20px", fontFamily: "'Segoe UI', sans-serif" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "32px" },
  badge: { display: "inline-block", background: "#E6FFFA", color: "#0D9488", fontSize: "0.8rem", fontWeight: "700", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px" },
  title: { fontSize: "2.2rem", fontWeight: "800", color: "#1A202C", marginBottom: "10px" },
  subtitle: { color: "#718096", fontSize: "1rem" },
  topRow: { display: "flex", gap: "12px", alignItems: "center", maxWidth: "700px", margin: "0 auto 24px" },
  searchBar: { display: "flex", alignItems: "center", background: "white", borderRadius: "14px", padding: "12px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", flex: 1, gap: "10px" },
  searchInput: { border: "none", outline: "none", flex: 1, fontSize: "1rem", color: "#2D3748" },
  clearBtn: { background: "none", border: "none", cursor: "pointer", color: "#A0AEC0", fontSize: "1rem" },
  cartBtn: { position: "relative", background: "#0D9488", color: "white", border: "none", borderRadius: "14px", padding: "12px 20px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" },
  cartCount: { position: "absolute", top: "-8px", right: "-8px", background: "#E53E3E", color: "white", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "800" },
  categoryRow: { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" },
  categoryBtn: { background: "white", border: "1px solid #E2E8F0", borderRadius: "100px", padding: "8px 18px", fontSize: "0.85rem", fontWeight: "600", color: "#4A5568", cursor: "pointer" },
  categoryBtnActive: { background: "#0D9488", borderColor: "#0D9488", color: "white" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "22px" },
  card: { background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer" },
  cardImageWrap: { background: "#F0FDFA", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
  cardIcon: { fontSize: "3rem" },
  stockBadge: { position: "absolute", top: "10px", right: "10px", background: "#C6F6D5", color: "#22543D", fontSize: "0.65rem", fontWeight: "700", padding: "4px 10px", borderRadius: "100px" },
  stockLimited: { background: "#FED7AA", color: "#9A3412" },
  cardBody: { padding: "18px" },
  cardCategory: { fontSize: "0.7rem", color: "#0D9488", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
  cardName: { fontSize: "1.05rem", fontWeight: "700", color: "#1A202C", margin: "6px 0 4px" },
  cardUnit: { fontSize: "0.85rem", color: "#A0AEC0", marginBottom: "16px" },
  cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardPrice: { fontSize: "1.1rem", fontWeight: "800", color: "#1A202C" },
  addBtn: { background: "#0D9488", color: "white", border: "none", borderRadius: "8px", padding: "8px 14px", fontSize: "0.8rem", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" },
  addBtnSuccess: { background: "#38A169" },
  emptyText: { textAlign: "center", color: "#A0AEC0", marginTop: "40px" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  modal: { background: "white", borderRadius: "24px", padding: "36px", maxWidth: "560px", width: "100%", position: "relative", maxHeight: "90vh", overflowY: "auto" },
  closeBtn: { position: "absolute", top: "16px", right: "16px", background: "#F7FAFC", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem", color: "#4A5568" },
  modalTop: { display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "24px" },
  modalIconWrap: { background: "#F0FDFA", borderRadius: "16px", width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  modalIcon: { fontSize: "2.5rem" },
  modalCategory: { fontSize: "0.7rem", color: "#0D9488", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" },
  modalName: { fontSize: "1.5rem", fontWeight: "800", color: "#1A202C", margin: "4px 0 6px" },
  modalBrand: { fontSize: "0.85rem", color: "#A0AEC0", marginBottom: "10px" },
  modalBadgeRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  modalStock: { background: "#C6F6D5", color: "#22543D", fontSize: "0.7rem", fontWeight: "700", padding: "4px 10px", borderRadius: "100px" },
  prescriptionBadge: { background: "#E6FFFA", color: "#0D9488", fontSize: "0.7rem", fontWeight: "700", padding: "4px 10px", borderRadius: "100px" },
  prescriptionRequired: { background: "#FFF5F5", color: "#C53030" },
  modalDivider: { height: "1px", background: "#EDF2F7", margin: "0 0 20px" },
  modalSection: { marginBottom: "20px" },
  modalSectionTitle: { fontSize: "0.9rem", fontWeight: "700", color: "#2D3748", marginBottom: "8px" },
  modalText: { fontSize: "0.9rem", color: "#718096", lineHeight: "1.7" },
  modalFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #EDF2F7" },
  modalPriceLabel: { fontSize: "0.75rem", color: "#A0AEC0", fontWeight: "600" },
  modalPrice: { fontSize: "1.6rem", fontWeight: "800", color: "#1A202C" },
  addCartBtn: { background: "#0D9488", color: "white", border: "none", borderRadius: "12px", padding: "14px 28px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" },
  cartSidebar: { background: "white", borderRadius: "24px", padding: "28px", maxWidth: "440px", width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" },
  cartHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  cartTitle: { fontSize: "1.2rem", fontWeight: "800", color: "#1A202C" },
  clearAllBtn: { background: "none", border: "1px solid #FC8181", color: "#E53E3E", borderRadius: "8px", padding: "6px 14px", fontSize: "0.8rem", fontWeight: "700", cursor: "pointer", marginBottom: "16px" },
  emptyCart: { textAlign: "center", padding: "40px 0" },
  cartItems: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" },
  cartItem: { display: "flex", alignItems: "center", gap: "12px", background: "#F7FAFC", borderRadius: "14px", padding: "14px" },
  cartItemIcon: { fontSize: "1.8rem", flexShrink: 0 },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: "0.9rem", fontWeight: "700", color: "#1A202C", marginBottom: "2px" },
  cartItemUnit: { fontSize: "0.75rem", color: "#A0AEC0", marginBottom: "4px" },
  cartItemPrice: { fontSize: "0.95rem", fontWeight: "800", color: "#0D9488" },
  cartItemRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" },
  qtyControls: { display: "flex", alignItems: "center", gap: "8px", background: "white", borderRadius: "8px", padding: "4px 8px", border: "1px solid #E2E8F0" },
  qtyBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", fontWeight: "700", color: "#0D9488", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" },
  qtyNum: { fontSize: "0.95rem", fontWeight: "700", color: "#1A202C", minWidth: "20px", textAlign: "center" },
  removeBtn: { background: "none", border: "none", color: "#E53E3E", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer", padding: "0" },
  cartFooter: { borderTop: "1px solid #EDF2F7", paddingTop: "20px" },
  cartTotal: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", fontSize: "0.95rem", fontWeight: "700", color: "#2D3748" },
  cartTotalAmount: { fontSize: "1.4rem", fontWeight: "800", color: "#1A202C" },
  checkoutBtn: { width: "100%", background: "#0D9488", color: "white", border: "none", borderRadius: "12px", padding: "14px", fontSize: "1rem", fontWeight: "700", cursor: "pointer" },
};

const css = `
  .medicine-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.1) !important;
  }
  @media (max-width: 480px) {
    .medicine-card { font-size: 0.95rem; }
  }
`;