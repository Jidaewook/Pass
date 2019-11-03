import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const BbslecPresenter = ({getall, error, loading}) => null;

BbslecPresenter.propTypes = {
    getall: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}

export default BbslecPresenter;