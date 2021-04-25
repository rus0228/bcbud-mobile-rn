import React from 'react';
import styled from 'styled-components/native';
import Sizes, {FontSizes} from '@/styles/Sizes';

function androidTextStyle() {
  if (!Sizes.isAndroid) {
    return '\n';
  }
  return `
    padding-horizontal: 0px;
    padding-vertical: 0px;\n
  `;
}

const StyledInput = styled.TextInput.attrs((props) => ({
  allowFontScaling: false,
}))`
  color: black;
  font-family: Roboto-Medium;
  font-size: ${FontSizes.label}px;
  height: 20px;
  ${androidTextStyle()}
`;

export default StyledInput;
