import { StyledSlider, StyledThumb, StyledTrack } from "./styled";

export const Slider = ({ min, max, onChange, value }: any, state: any) => {
  return (
    <StyledSlider
      onChange={onChange}
      renderTrack={Track}
      renderThumb={Thumb}
      value={value}
      min={min}
      max={max}
    />
  );
};

const Thumb = (props: any, state: any) => <StyledThumb {...props} />;
const Track = (props: any, state: any) => (
  <StyledTrack {...props} index={state.index} />
);
