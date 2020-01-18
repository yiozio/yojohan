import styled from 'styled-components';

export default styled.input({
  '&[type="number"]': {
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      margin: 0,
      appearance: 'none'
    }
  }
});
