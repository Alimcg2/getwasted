
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
    share_image: {
        width: '95%',
        height: '85%',
        marginTop: 20,
    },
    share_container: {
        height: 300,
        marginTop: 50,
        marginBottom: 50
    },
    share_text: {
        fontSize: 20,
        margin: 5
    },
    share_date: {
        fontSize: 15,
        marginLeft: 5,
        color: 'grey'
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
        fontSize: 20,
        paddingLeft: 20,
        alignSelf: 'flex-start',
        color: "black",
        paddingTop: "160%"
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
    posts: {
        marginBottom: 50
    },
    button2: {
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        marginBottom: 20,
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
    menu: {
        backgroundColor: "white",
        width: "50%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        display: "none",
        paddingTop: 20,
    },
    menu_item: {
        fontSize: 20,
        paddingTop: 20,
        paddingLeft: 20,
        alignSelf: 'flex-start',
        color: "black",
    },
    menu_active: {
        display: "flex",
    },
    postContainer: {
        display: "flex",
    },
    search_active: {
        display: "none",
    },
    list_container: {
        width: 250,
        paddingTop: 30,
    },
    subtitle: {
        fontSize: 20,
    },
    subtitle2: {
        fontSize: 18,
        fontWeight: "300",
        textAlign: "left",
        fontStyle: "italic"
    },
    subtitle3: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "left",
        fontStyle: "normal"
    },
    goal_data_container: {
        height: "47%",
        marginTop: 0
    },
    data_header: {
        fontSize: 20,
        paddingTop: 10,
        fontWeight: "800",
    },
    goal_data: {
        fontSize: 20,
        fontWeight: "300"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -50
    },
    more_posts: {
        marginBottom: 150
    },
    follow_container: {
        display: "flex",
        flexDirection: 'row'
        
    },
    subtitle3: {
        fontSize: 16,
        padding: 20,
        paddingLeft: 0,
        fontWeight: "300",
        textAlign: "left",
        fontStyle: "italic",
        color: "black"
        
    },
    search_button: {
        marginTop: -45,
        padding: 2,
        textAlign: "right",
        marginLeft: "80%",
        width: 25,
        height: 25,
        
    }
})

module.exports = styles;
module.exports.constants = constants;
                               




