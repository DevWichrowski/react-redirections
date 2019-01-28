import React, {Component} from 'react';
import './CombinedRulesContainer.scss';
import RulesBox from "../../Rules/RulesBox/RulesBox";

class CombinedRulesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toWWWandHTTPS: '',
            toHTTPS: '',
            toWWW: '',
            resultToWWWandHTTPS: '',
            resultToHTTPS: '',
            resultToWWW: '',
            copySuccess: '',
        }
    }

    saveUrls = (event, url) => {
        this.setState({[url]: event.target.value});
    };

    createRedirection = (urlToRedirect, redirectionType) => {
        let result = '';
        switch (redirectionType) {
            //http://bez_www.(domena) -> https://www.(domena)
            case 'toWWWandHTTPS':
                result = `RewriteEngine On\n`;
                result += `RewriteCond %{HTTP_HOST} !^www\\.\n`;
                result += `RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
                result += `RewriteCond %{HTTPS} off`;
                result += `RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
                break;
                //http://(www.domena) -> https://(www.domena)
            case 'toHTTPS':
                result = `RewriteEngine On\n`;
                result += `RewriteCond %{HTTPS} !=on\n`;
                result += `RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
                break;
                //https://bez_www.(domena) -> https://www.(domena)
            case 'toWWW':
                result = `RewriteEngine On\n`;
                result += `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
                result += `RewriteRule (.*) http://www.${urlToRedirect}/$1 [R=301,L]`;
                break;
            default:
                result = 'Unknown url';
                break;
        }
        return result;
    };

    generateRedirection = (url) => {
        if (url === 'toWWWandHTTPS') {
            if (this.state.toWWWandHTTPS !== '')
                this.setState({resultToWWWandHTTPS: this.createRedirection(this.state.toWWWandHTTPS, url)});
        } else if (url === 'toHTTPS') {
            if (this.state.toHTTPS !== '') this.setState({resultToHTTPS: this.createRedirection(this.state.toHTTPS, url)});
        } else if (url === 'toWWW') {
            if (this.state.toWWW !== '')
                this.setState({resultToWWW: this.createRedirection(this.state.toWWW, url)});
        }
    };

    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Skopiowano do schowka!' });
        setTimeout(() => {
            this.setState({ copySuccess: '' });
        }, 2000);
    };

    render() {
        return (
            <div clasName="page-body">
                <h1 className="h1-tools">Inne reguły przekierowań</h1>
                <hr />
                <RulesBox
                    stateName="toWWWandHTTPS"
                    info="?"
                    description={'Przekierowanie z bez www i http -> www i https'}
                    saveUrl={(event) => this.saveUrls(event, 'toWWWandHTTPS')}
                    generateRedirection={() => this.generateRedirection('toWWWandHTTPS')}
                    resultRedirection={this.state.resultToWWWandHTTPS}
                />
                <RulesBox
                    stateName="toHTTPS"
                    info="?"
                    description={'Przekierowanie z bez www i http -> www i https'}
                    saveUrl={(event) => this.saveUrls(event, 'toHTTPS')}
                    generateRedirection={() => this.generateRedirection('toHTTPS')}
                    resultRedirection={this.state.resultToHTTPS}
                />
                <RulesBox
                    stateName="toWWW"
                    info="?"
                    description={'Przekierowanie z bez www i http -> www i https'}
                    saveUrl={(event) => this.saveUrls(event, 'toWWW')}
                    generateRedirection={() => this.generateRedirection('toWWW')}
                    resultRedirection={this.state.resultToWWW}
                />
            </div>
        );
    }
}

export default CombinedRulesContainer;