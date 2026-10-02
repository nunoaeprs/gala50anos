// Utilitários partilhados pelas páginas da galeria.
window.Gala = {
  async fetchPhotos(since = 0) {
    const res = await fetch(`/api/photos${since ? `?since=${since}` : ""}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Não foi possível carregar as fotografias.");
    return (await res.json()).photos;
  },


  timeAgo(date) {
    const s = Math.max(1, Math.round((Date.now() - new Date(date).getTime()) / 1000));
    if (s < 60) return "agora mesmo";
    const m = Math.round(s / 60);
    if (m < 60) return `há ${m} min`;
    const h = Math.round(m / 60);
    if (h < 24) return `há ${h} h`;
    return new Date(date).toLocaleDateString("pt-PT", { day: "numeric", month: "long" });
  },

  esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  },
};
