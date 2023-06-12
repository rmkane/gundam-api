import React, { ReactElement, ReactNode } from 'react';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

export type LoadingMaskProps = {
  active?: boolean;
  children: ReactElement;
  spinner?: boolean | ReactNode;
  text?: ReactNode;
};

function LoadingMask(props: LoadingMaskProps): JSX.Element {
  const { active, children, spinner, text } = props;
  return (
    <LoadingOverlayWrapper
      active={active}
      spinner={spinner}
      text={text ?? 'Loading...'}
      styles={{
        content: (base) => ({
          ...base,
          color: 'hsla(210, 87%, 53%, 1.0)',
        }),
        overlay: (base) => ({
          ...base,
          background: 'hsla(210, 87%, 53%, 0.33)',
        }),
        spinner: (base) => ({
          ...base,
          width: '100px',
          '& svg circle': {
            stroke: 'hsla(210, 87%, 53%, 1.0)',
          },
        }),
      }}
    >
      {children}
    </LoadingOverlayWrapper>
  );
}

export default LoadingMask;
