import { ReactNode } from 'react';

interface IProps {
  svgIcon: ReactNode;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const Icon = ({ svgIcon, width = 24, height = 24, style }: IProps) => {
  return (
    <div
      style={{
        width,
        height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {svgIcon}
    </div>
  );
};
export default Icon;
