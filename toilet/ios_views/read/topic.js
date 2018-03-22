import React, {Component} from 'react';

import {
    StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';

import Util from './../util'
import TWebView from './../twebview'

class toiletPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }
    }

    render() {

        //循环数据
        var views = [];
        var data = this.state.data;
        for (var i in data) {
            views.push(
                <TouchableOpacity style={styles.image_item} key={i}
                                  onPress={this._showWebPage.bind(this, data[i].title, data[i].url)}>
                    <Image resizeMode='cover' style={styles.image} source={{uri: data[i].img}}/>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text1}>推荐专题</Text>
                </View>
                <View style={styles.image_view}>
                    {views}
                </View>
                <View>
                    <Text style={styles.text2}>查看更多同期专题&gt;</Text>
                </View>
            </View>
        );
    }

    _showWebPage(title, url) {
        this.props.navigator.push({
            component: TWebView,
            title: title,
            barTintColor: '#fff',
            passProps: {
                url: url,
                isMargin: 1
            }
        })
    }
}

var styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    text1: {
        fontSize: 17,
        marginBottom: 10,
        color: '#5E5E5E'
    },
    text2: {
        fontSize: 13,
        marginTop: 10,
        color: '#CCC',
        fontWeight: '500',
        marginBottom: 10
    },
    image_view: {
        flexDirection: 'row',
        flex: 1,
    },
    image_item: {
        flex: 1
    },
    image: {
        width: (Util.size.width - 30) / 2,
        height: 80,
        borderRadius: 5
    }
});

module.exports = toiletPage;