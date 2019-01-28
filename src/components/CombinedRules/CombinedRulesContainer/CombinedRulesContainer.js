import React, {Component} from 'react';
import './CombinedRulesContainer.scss';
import CombinedRulesBox from "../CombinedRulesBox/CombinedRulesBox";

class CombinedRulesContainer extends Component {
    render() {
        return (
            <div>
                <h2>container</h2>
                <CombinedRulesBox />
            </div>
        );
    }
}

export default CombinedRulesContainer;