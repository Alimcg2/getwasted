
const React = require('react-native')
const {StyleSheet} = React
const constants = {
    actionColor: '#24CE84'
};



var styles = StyleSheet.create({
    welcome: {
        fontSize: 40,
        paddingBottom: 30,
        textAlign: 'center',
    },
    container: {
        justifyContent: 'center',
        padding: 20,
        paddingTop: 100,
        paddingBottom: 250,
        backgroundColor: '#FFFFFF',
    },
    blogName: {
        textAlign: 'center',
        padding: 10,
    },
    image:{
        width: 200,
        height: 200,
    },
    container_reduce:{
        justifyContent: 'center',
        padding: 20,
        paddingTop: 100,
        paddingBottom: 250,
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
    },
})

module.exports = styles;
module.exports.constants = constants;
                               




