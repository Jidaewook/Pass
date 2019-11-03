import React from 'react';
import BbslecPresenter from './BbslecPresenter';

//api에 등록된 
export default class extends React.Component {
    state = {
        getall: null,
        error: null,
        loading: null
    }

    render() {
        // 위에 있는 스테이트의 값을 상수화한다.
        const {getall, error, loading} = this.state;

        return (
            <BbslecPresenter 
                getall = {getall}
                error = {error}
                loading = {loading}
            />

            
        );
    }
}
