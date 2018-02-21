
const React = require('react-native')
const {StyleSheet} = React
const constants = {
    actionColor: '#24CE84'
};

var styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        padding: 100,
        margin: 10,
    },
    container: {   
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    blogName: {
        textAlign: 'center',
        padding: 10,
    },
})

module.exports = styles
module.exports.constants = constants;
                               
