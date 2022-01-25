import ReactSlider from "react-slider";
import styled from "styled-components";

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 15px;
  margin: 15px 0;
`;

export const StyledThumb = styled.div`
  height: 15px;
  line-height: 15px;
  width: 15px;
  text-align: center;
  background-color: #666;
  border-radius: 50%;
  cursor: grab;
  &:focus {
    outline: none;
  }
`;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  border-radius: 15px;
  border: 1px solid #666;
`;
