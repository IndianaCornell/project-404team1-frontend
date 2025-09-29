import Logo from "./Logo";
import NetworkLinks from "./NetworkLinks";
import Copyright from "./Copyright";
import "@/styles/footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-row">
        <Logo />
        <NetworkLinks />
        <Copyright />
      </div>
    </footer>
  );
}
