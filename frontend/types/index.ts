import {ReactNode, SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type AuthGuardProps = {
  userType?: 'none' | 'teacher' | 'student';
  redirectPath?: string;
  children: ReactNode;
}