import type { IconType } from "react-icons";

type Icon3DProps = {
  icon: IconType;
  className?: string;
};

export function Icon3D({ icon: Icon, className = "" }: Icon3DProps) {
  return (
    <span className={`icon-3d ${className}`}>
      <Icon />
    </span>
  );
}
