import LogoLight from "@assets/icons/FoodiesLogoLight.svg?react";
import LogoDark from "@assets/icons/FoodiesLogoDark.svg?react";


const map = {
  logoLight: LogoLight,
  logoDark: LogoDark,
};

export default function Icon({ name, className, ...props }) {
  const Cmp = map[name];
  if (!Cmp) return null;
  return <Cmp className={className} {...props} />;
}

// Using:
// import Logo from "@/components/ui/Logo.jsx";
// <Logo name="eye"/>
// <Logo name="heart" width={80} height={80}/>