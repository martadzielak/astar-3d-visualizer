import ReactSlider from "react-slider";
import styled from "styled-components";

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 10px;
  margin: 10px 0;
`;

export const StyledThumb = styled.div`
  height: 10px;
  line-height: 10px;
  width: 10px;
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
  border-radius: 10px;
  border: 1px solid #666;
`;

export const Label = styled.p`
  color: #666;
  font-size: 10px;
`;
