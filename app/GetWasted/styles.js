
const React = require('react-native')
const {StyleSheet} = React
const constants = {
    actionColor: '#24CE84'
};



var styles = StyleSheet.create({
    welcome: {
        fontSize: 40,
        textAlign: 'center',
    },
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    blogName: {
        textAlign: 'center',
        padding: 10,
    },
})

module.exports = styles;
module.exports.constants = constants;
                               




