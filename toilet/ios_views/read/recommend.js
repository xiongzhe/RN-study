import React, {Component} from 'react';

import {
    StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native';

import Util from './../util'
import TWebView from "../twebview";

class recommendPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            data: props.data
        }
    }

    render() {

        //循环数据
        var view1 = [];
        var view2 = [];
        var data = this.state.data;
        for (var i in data) {
            let item = (
                <TouchableOpacity style={styles.image_item} key={i}
                                  onPress={this._showWebPage.bind(this, data[i].title, data[i].url)}>
                    <View style={styles.shadow}>
                        <Image resizeMode='cover' style={styles.image}
                               source={{uri: data[i].img}}/>
                    </View>
                    <Text style={styles.text} numberOfLines={2}>{data[i].title}</Text>
                </TouchableOpacity>
            )
            if (i < 4) {
                view1.push(item)
            } else {
                view2.push(item)
            }
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text1}>{this.state.name}</Text>
                <View style={styles.image_view}>
                    {view1}
                </View>
                <View style={styles.image_view}>
                    {view2}
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
        paddingRight: 10
    },
    text: {
        width: (Util.size.width - 50) / 4,
        fontSize: 13,
        color: '#CCC',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 5,
    },
    text1: {
        fontSize: 17,
        marginTop: 10,
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
        marginTop: 10
    },
    image_item: {
        flex: 1,
    },
    //图片阴影
    shadow: {
        shadowOpacity: 1,
        shadowColor: '#ccc',
        shadowOffset: {width: 1 / Util.pixel, height: Util.pixel}
    },
    image: {
        width: (Util.size.width - 50) / 4,
        height: 120,
    }
});

module.exports = recommendPage;