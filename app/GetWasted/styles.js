
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
    container_reduce: {
        justifyContent: 'center',
        padding: 20,
        paddingTop: 100,
        paddingBottom: 250,
        backgroundColor: '#FFFFFF',
    },
    header2: {
        fontSize: 20,
    },
    square: {
        width: 50, 
        height: 50, 
        padding: 35,
        backgroundColor: 'powderblue'
    },
    reduce_pictures_flex_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 4,
        
    },
    reduce_button_flex_container: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    bigboy_trash: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

module.exports = styles;
module.exports.constants = constants;
                               




