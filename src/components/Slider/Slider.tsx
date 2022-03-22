import { Label, StyledSlider, StyledThumb, StyledTrack } from "./styled";

export const Slider = (
  { min, max, onChange, value, name }: any,
  state: any
) => {
  return (
    <>
      <Label>{name}</Label>
      <StyledSlider
        onChange={onChange}
        renderTrack={Track}
        renderThumb={Thumb}
        value={value}
        defaultValue={value}
        min={min}
        max={max}
      />
    </>
  );
};

const Thumb = (props: any) => <StyledThumb {...props} />;
const Track = (props: any, state: any) => (
  <StyledTrack {...props} index={state.index} />
);
