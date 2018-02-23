
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
})

module.exports = styles;
module.exports.constants = constants;
                               




