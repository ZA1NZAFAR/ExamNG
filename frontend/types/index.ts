import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ExamServiceProviderProps {
	apiUrl: string;
	children: React.ReactNode;
}
