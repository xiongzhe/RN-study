import React, {Component} from 'react';

import {
    StyleSheet, View, Text, TouchableOpacity
} from 'react-native';

import Util from './../util'
import List from './list'

class toiletPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            navigator: props.navigator
        }
    }

    render() {

        //循环数据
        var view1 = [];
        var view2 = [];
        var data = this.state.data;
        for (var i in data) {
            let item = (
                <View style={styles.row_item} key={i}>
                    <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this, data[i].text)}>
                        <Text style={styles.title}>{data[i].text}</Text>
                    </TouchableOpacity>
                </View>
            )
            if (i < 2) {
                view1.push(item)
            } else {
                view2.push(item)
            }
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>分类</Text>
                <View style={styles.content}>
                    <View style={styles.row}>
                        {view1}
                    </View>
                    <View style={styles.row}>
                        {view2}
                    </View>
                </View>

            </View>
        );
    }

    //跳转到分类列表页
    _goToList(name) {
        let type = this._getType(name);
        this.state.navigator.push({
            component: List,
            title: name,
            barTintColor: '#fff',
            passProps: {
                type: type
            }
        })
    }

    _getType(name) {
        let type = '互联网';
        switch (name) {
            case '互联网':
                type = 'it';
                break;
            case '笑料':
                type = 'cookies';
                break;
            case '管理':
                type = 'manager';
                break;
            case '散文':
                type = 'sanwen';
                break;
            default:
                type = 'it';
                break;
        }
        return type;
    }
}

var styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    content: {
        marginTop: 5
    },
    text1: {
        fontSize: 17,
        marginTop: 10,
        color: '#5E5E5E'
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
        flex: 1
    },
    row_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: (Util.size.width - 30) / 2,
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#F1F1F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        color: '#707070'
    }
});

module.exports = toiletPage;