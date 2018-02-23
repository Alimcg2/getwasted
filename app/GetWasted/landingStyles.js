
const React = require('react-native')
const {StyleSheet} = React
const constants = {
    actionColor: '#24CE84'
};



var styles = StyleSheet.create({
    submit: {
        color: "black",
        borderColor: "red",
        backgroundColor: "#000000",
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        padding: 80,
    },
    container: {
        justifyContent: 'center',
        marginTop: 100,
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
                               




