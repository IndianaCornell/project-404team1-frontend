import Logo from "./Logo";
import Nav from "./Nav";
import AuthBar from "./AuthBar";
import "@/styles/header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-row">
        <Logo />
        <Nav />
        <AuthBar />
      </div>
    </header>
  );
}
