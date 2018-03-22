import React, {Component} from 'react';

import {
    StyleSheet, View, Text, Image, ListView, TouchableOpacity
} from 'react-native';

import Util from './../util'
import TWebView from "../twebview";

class listPage extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            type: this.props.type,
            dataSource: ds.cloneWithRows([]),
        }
    }

    render() {
        return (
            <ListView
                enableEmp tySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => (
                    <TouchableOpacity style={styles.item}
                                      onPress={this._showWebPage.bind(this, rowData.title, rowData.url)}>
                        <View style={styles.shadow}>
                            <Image resizeMode='cover'
                                   style={styles.image}
                                   source={{uri: rowData.img}}/>
                        </View>
                        <View style={styles.text_wraper}>
                            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                            <Text style={styles.text}>{rowData.time}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
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

    componentDidMount() {
        let url = 'http://localhost:3000/data/read?type=' + this.state.type;
        var self = this;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        Util.get(url,
            function (data) {
                if (data.status === 1) {
                    let obj = data.data;
                    self.setState({
                        dataSource: ds.cloneWithRows(obj)
                    })
                } else {
                    alert('服务异常,正在紧急修复,请耐心等待');
                }
            }, function (err) {
                alert('服务异常,正在紧急修复,请耐心等待');
            })
    }
}

var styles = StyleSheet.create({
    item: {
        height: 78,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#EDEDED',
        borderBottomWidth: Util.pixel,
        flexDirection: 'row'
    },
    text_wraper: {
        marginLeft: 10,
        marginTop: 9,
        justifyContent: 'center',
        height: 60,
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    text: {
        fontSize: 13,
        color: '#CCC',
        fontWeight: '500',
        marginTop: 5,
    },
    //图片阴影
    shadow: {
        shadowOpacity: 1,
        shadowColor: '#ccc',
        shadowOffset: {width: 1 / Util.pixel, height: Util.pixel}
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 3,
        marginTop: 9
    }
});

module.exports = listPage;