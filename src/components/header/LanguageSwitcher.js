import React from 'react'
import { connect } from 'react-redux'
import { setLocalLang } from '../../store/actions/themeActions'

const LanguageSwitcher = ({ setLocalLang }) => {
    return (
        <div>
            <p onClick={() => setLocalLang('en')}>en</p>
            <p onClick={() => setLocalLang('pl')}>pl</p>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setLocalLang: lang => dispatch(setLocalLang(lang)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(LanguageSwitcher)
