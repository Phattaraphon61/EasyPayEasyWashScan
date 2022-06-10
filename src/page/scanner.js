import React, { Component } from 'react'
import QrReader from 'modern-react-qr-reader'
import liff from '@line/liff';
export default class scanner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: 'No result'
        }

        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.initLine = this.initLine.bind(this);
    }


    handleScan = data => {
        if (data) {
            this.state.result = data;
            console.log(this.state.result);
            this.setState({ result: data });
        }
    }

    handleError = err => {
        console.error(err)
    }


    componentDidMount() {
        this.initLine()
      }

    initLine = () => {
        liff.init({ liffId: '1657208203-5zXOyVzQ' }, () => {
            if (liff.isLoggedIn()) {
                const idToken = liff.getIDToken();
                // setIdToken(idToken);
                liff.getProfile().then(profile => {
                    console.log(profile);
                    // setDisplayName(profile.displayName);
                    // setPictureUrl(profile.pictureUrl);
                    // setStatusMessage(profile.statusMessage);
                    // setUserId(profile.userId);
                }).catch(err => console.error(err));
            } else {
                liff.login();
            }
        }, err => console.error(err));
    }

    // runApp = () => {
    //     const idToken = liff.getIDToken();
    //     // setIdToken(idToken);
    //     liff.getProfile().then(profile => {
    //         console.log(profile);
    //         // setDisplayName(profile.displayName);
    //         // setPictureUrl(profile.pictureUrl);
    //         // setStatusMessage(profile.statusMessage);
    //         // setUserId(profile.userId);
    //     }).catch(err => console.error(err));
    // }

    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}
