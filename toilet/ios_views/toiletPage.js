import React, {Component} from 'react';

import {
    StyleSheet, View, Text, WebView
} from 'react-native';

import TWebView from './twebview'

class toiletPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TWebView url="http://www.baidu.com"/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = toiletPage;