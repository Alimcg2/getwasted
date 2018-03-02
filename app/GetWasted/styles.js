
const React = require('react-native')
const {StyleSheet} = React
const constants = {
    actionColor: '#24CE84'
};



var styles = StyleSheet.create({
    status: {
        fontSize: 20,
        paddingBottom: 30,
    },
    main_text: {
        fontSize: 30,
        paddingBottom: 10,
    },
    header: {
        fontSize: 40,
        fontWeight: "900",
        marginTop: 10,
    },
    header_main: {
        fontSize: 60,
        padding: 30,
        paddingLeft: 0,
        fontWeight: "900",
    },
    container: {
        backgroundColor: '#FFFFFF',
    },
    blogName: {
        textAlign: 'center',
        padding: 10,
    },
    image:{
        width: 80,
        height: 80,
        marginTop: 20,
    },
    container_main: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 60,
        flex: 1,
    },
    header2: {
        fontSize: 25,
        padding: 10,
        paddingLeft: 0,
        fontStyle: "italic",
        fontWeight: "200",
    },
    trashyPic: {
        width: 250,
        height: 250,
        margin: 10,
        marginLeft: 0,
    },
    date: {
        fontSize: 20,
        color: "#bbb",
        paddingBottom: 20,
    },
    reduce_pictures_flex_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 4,
    },
    reduce_button_container: {
        height: 40,
        marginTop: 20,
    },
    bigboy_trash: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE",
        marginLeft: 20,
    },
    image_container: {
        height: 300,
    },
    signOut: {
        color: "red",
        fontSize: 20,
        padding: 20,
        paddingLeft: 0,
        alignSelf: 'flex-start', 
    },
    button: {
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        margin: 5,
        marginLeft: 0,
        right: 0,
        width: 400,
        backgroundColor: "#e2ddd0",
        fontWeight: "300",
        textAlign: "left",
    },
    button_bottom: {
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        margin: 5,
        marginLeft: 0,
        marginBottom: 80,
        right: 0,
        width: 400,
        backgroundColor: "#CED0CE",
        fontWeight: "300",
        textAlign: "left",
        fontStyle: "italic",
    },
})

module.exports = styles;
module.exports.constants = constants;
                               




