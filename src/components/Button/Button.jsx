import PropTypes from 'prop-types';

import { LoadMoreBtn } from './Button.styled';

export default function Button({ onBtnClick }) {
  return (
    <LoadMoreBtn type="button" onClick={onBtnClick}>
      Load more
    </LoadMoreBtn>
  );
}

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
