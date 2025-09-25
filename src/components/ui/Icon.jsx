import Eye from "@assets/icons/eye.svg?react";
import EyeOff from "@assets/icons/eyeOff.svg?react";
import Heart from "@assets/icons/heart.svg?react";
import HeartActive from "@assets/icons/heartActive.svg?react";
import HeartMobile from "@assets/icons/heartMobile.svg?react";
import Trash from "@assets/icons/trash.svg?react";
import TrashActive from "@assets/icons/trashActive.svg?react";
import TrashMobile from "@assets/icons/trashMobile.svg?react";
import Arrow from "@assets/icons/arrow.svg?react";
import ArrowActive from "@assets/icons/arrowActive.svg?react";
import ArrowMobile from "@assets/icons/arrowMobile.svg?react";
import Youtube from "@assets/icons/youtube.svg?react";
import Instagram from "@assets/icons/instagram.svg?react";
import Facebook from "@assets/icons/facebook.svg?react";

const map = {
  eye: Eye,
  eyeOff: EyeOff,
  heart: Heart,
  heartActive: HeartActive,
  heartMobile: HeartMobile,
  trash: Trash,
  trashActive: TrashActive,
  trashMobile: TrashMobile,
  arrow: Arrow,
  arrowActive: ArrowActive,
  arrowMobile: ArrowMobile,
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
};

export default function Icon({ name, className, ...props }) {
  const Cmp = map[name];
  if (!Cmp) return null;
  return <Cmp className={className} {...props} />;
}

// Using:
// import Icon from "@/components/ui/Icon.jsx";
// <Icon name="eye"/>
// <Icon name="heart" width={80} height={80}/>