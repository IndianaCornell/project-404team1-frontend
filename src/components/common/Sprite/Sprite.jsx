import fbRaw from "@/assets/icons/facebook.svg?raw";
import igRaw from "@/assets/icons/instagram.svg?raw";
import ytRaw from "@/assets/icons/youtube.svg?raw";

const toSymbol = (raw, id) => {
  if (!raw || typeof raw !== "string") return "";
  const cleaned = raw
    .replace(/^\uFEFF/, "")
    .replace(/<\?xml[^>]*\?>/gi, "")
    .replace(/<!doctype[^>]*>/gi, "")
    .trim();

  const viewBoxMatch = cleaned.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  const inner = cleaned.replace(/<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");

  return `<symbol id="${id}" viewBox="${viewBox}">${inner}</symbol>`;
};

const symbols = [
  toSymbol(fbRaw, "icon-facebook"),
  toSymbol(igRaw, "icon-instagram"),
  toSymbol(ytRaw, "icon-youtube"),
].join("");

const Sprite = () => (
  <svg
    aria-hidden="true"
    className="visually-hidden"
    dangerouslySetInnerHTML={{ __html: symbols }}
  />
);

export default Sprite;
