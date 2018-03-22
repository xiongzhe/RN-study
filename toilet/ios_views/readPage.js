import React, {Component} from 'react';

import {
    StyleSheet, View, Text, ScrollView, NavigatorIOS
} from 'react-native';

import Util from './util'

import Category from './read/category'
import Recommend from './read/recommend'
import Search from './read/search'
import Topic from './read/topic'

class Hr extends Component {
    render() {
        return (
            <View>
                <View style={styles.hr}/>
            </View>

        );
    }
}

class readView extends Component {

    constructor() {
        super();
        this.state = {
            isShow: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Search/>
                <Hr/>
                {
                    this.state.isShow ?
                        <ScrollView style={styles.container}>
                            <Topic data={this.state.recommendTopic} navigator={this.props.navigator}/>
                            <Hr/>
                            <Recommend name="热门推荐" data={this.state.hotTopic} navigator={this.props.navigator}/>
                            <Hr/>
                            <Category data={this.state.category} navigator={this.props.navigator}/>
                            <Hr/>
                            <Recommend name="清新一刻" data={this.state.other} navigator={this.props.navigator}/>
                        </ScrollView>
                        : null
                }


            </View>
        );
    }

    // TODO : fetch data
    componentDidMount() {
        var self = this;
        Util.get('http://localhost:3000/data/read?type=config',
            function (data) {
                let obj = data.data;
                if (data.status === 1) {
                    self.setState({
                        isShow: true,
                        recommendTopic: obj.recommendTopic,
                        hotTopic: obj.hotTopic,
                        category: obj.category,
                        other: obj.other,
                    });
                }
            },
            function (err) {
                console.log(err)
            })
    }
}

class readPage extends Component {

    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: readView,
                    title: '阅读',
                    navigationBarHidden: true
                }}
                style={{flex: 1}}
            />
        )
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 55
    },
    text: {
        fontSize: 20
    },
    hr: {
        borderColor: '#F0F0F0',
        borderWidth: Util.pixel,
        marginTop: 10
    }
});

module.exports = readPage;