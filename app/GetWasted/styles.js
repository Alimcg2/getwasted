
const React = require('react-native')
const { StyleSheet } = React
const constants = {
    actionColor: '#24CE84'
};



var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    gallery: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    goalText: {
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
    headerRight: {
        fontSize: 32,
        fontWeight: "900",
        width: "70%",
        marginLeft: 20
    },
    flexContainer: {
        flex: 1,
        flexDirection: "row",
        alignContent: "flex-start",
        marginTop: 40
    },
    flexContainer2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "flex-start",
        flexWrap: "wrap"
    },
    headerPadding: {
        fontSize: 40,
        fontWeight: "900",
        marginTop: 40,
    },
    headerPadding2: {
        fontSize: 32,
        fontWeight: "900",
        marginTop: 40,
    },
    header_main: {
        fontSize: 60,
        padding: 30,
        paddingTop: 80,
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
    icon: {
        padding: 20,
        opacity: 0.6,
    },
    iconClicked: {
        padding: 20,
        backgroundColor: "white",
    },
    profileImage: {
        width: 70,
        height: 70,
    },
    profileImage2: {
        width: 80,
        height: 80,
        marginTop: 40,
    },
    // share_image: {
    //     width: '95%',
    //     height: '85%',
    //     marginTop: 20,
    // },
    share_container: {
        paddingBottom: 500
    },
    share_text: {
        fontSize: 20,
        margin: 5
    },
    share_date: {
        fontSize: 15,
        marginLeft: 5,
        color: 'grey',
        width: 350,
        marginTop: -10,
    },
    share_likes: {
        fontSize: 15,
        marginLeft: 5,
        color: 'grey'
    },
    trashyDate: {
        fontSize: 15,
        color: 'grey'
    },
    buffer: {
        height: 200
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
    status: {
        fontSize: 20,
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
    image: {
        height: 20,
        width: 20,
    },
    plusIcon: {
        height: 30,
        width: 30,
        right: 15,
        padding: 15,
        position: "absolute",
        top: -40,
        opacity: 0.6
    },
    closeIcon: {
        height: 20,
        width: 20,
        right: 25,
        position: "absolute",
        top: -35,
        opacity: 0.6
    },
    backIcon: {
        height: 35,
        width: 35,
        position: "absolute",
        top: -30,
        left: 10,
        opacity: 0.6
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
        marginBottom: 50,
    },
    profilePosts: {
        marginBottom: 200,
    },
    button2: {
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        marginBottom: 80,
        margin: 5,
        marginLeft: 0,
        right: 0,
        width: 400,
        backgroundColor: "#e2ddd0",
        fontWeight: "300",
        textAlign: "left",
    },
    button2NoPadding: {
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
    paddingBottom: {
        marginBottom: 100,
    },
    paddingBottom2: {
        marginBottom: 120,
    },
    button3: {
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        marginBottom: 80,
        margin: 5,
        marginLeft: 0,
        right: 0,
        width: 400,
        backgroundColor: "#CED0CE",
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
    smallButton: {
        color: "black",
        fontSize: 16,
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
    menu: {
        backgroundColor: "#f0f0f0",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 2,
        bottom: 0,
        width: "120%",
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
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
        fontSize: 18,
    },
    subtitle2: {
        fontSize: 16,
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
        marginBottom: 300
    },
    follow_container: {
        display: "flex",
        flexDirection: 'row',

    },
    subtitle3: {
        fontSize: 16,
        padding: 20,
        paddingLeft: 0,
        fontWeight: "300",
        textAlign: "left",
        fontStyle: "italic",
        color: "black",

    },
    search_button: {
        marginTop: -45,
        padding: 2,
        marginLeft: "80%",
        width: 25,
        height: 25,

    },
    no_posts_found: {
        marginTop: 50
    },
    none: {
        display: "none",
    },
    smallHeader: {
        fontSize: 40,
        marginTop: 80,
    },
    largeHeader: {
        fontSize: 45,
        fontWeight: "900",
        marginTop: 10,
    },
    largeHeader2: {
        fontSize: 40,
        fontWeight: "900",
        marginTop: 10,
    },
    skip: {
        marginRight: "90%",
        color: "black",
    },
    next: {
        marginLeft: "30%",
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        right: 0,
        width: 400,
        backgroundColor: "#e2ddd0",
        fontWeight: "300",
        textAlign: "left",
        marginTop: -40,

    },
    next2: {
        marginLeft: "30%",
        color: "black",
        fontSize: 25,
        padding: 10,
        paddingLeft: 20,
        right: 0,
        width: 400,
        backgroundColor: "white",
        fontWeight: "300",
        textAlign: "left",
        marginTop: -40,

    },
    buttonBottom: {
        position: "absolute",
        paddingLeft: 60,
        bottom: 30,

    },
    smallText: {
        paddingTop: 100,
        fontSize: 20
    },
    smallText2: {
        paddingTop: 20,
        fontSize: 18,
        fontStyle: "italic",
    },
    smallText3: {
        padding: 0,
        margin: 0,
        fontSize: 17,
        fontStyle: "italic",
    },
    bold: {
        fontWeight: "800",
    },
    tutorialImage: {
        height: 420,
        width: 360,
        alignSelf: "center",
    },
    container_main2: {
        backgroundColor: '#f0f0f0',
        paddingLeft: 60,
        flex: 1,
    },
    container_main3: {
        backgroundColor: '#dcdcdc',
        flex: 1,
        justifyContent: "center",
        
    },
    settingsImage: {
        width: 20,
        height: 20,
        right: 15,
        position: "absolute",
        top: -25,
        opacity: 0.6,
    },
    topContainer: {
        height: 65,
        marginLeft: -60,
        backgroundColor: "#f0f0f0",
        zIndex: 1

    },
    title: {
        fontSize: 24,
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 30,
        fontWeight: "200"
    },
    goalTitle: {
        fontSize: 24,
        fontStyle: "italic",
        marginTop: 30,
        fontWeight: "200"
    },
    hr: {
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        marginTop: -15,
        marginLeft: -60,
        color: "grey",
        zIndex: -3,
        flex: 1,

    },
    pls: {
        flexDirection: 'row',
    },
    outline: {
        shadowOffset: { width: 0, height: -5, },
        shadowColor: 'black',
        shadowOpacity: 0.5,

    },
    scrollContainer: {
        marginBottom: 100,
    },
    heartImage: {
        width: 30,
        height: 30,
        opacity: 0.6,
        
    },
    userContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
    },
    userSearchInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 80
    },
    userSearchPhoto: {
        width: 50,
        height: 50
    },
    userSearchName: {
        fontWeight: "bold",
        padding: 10
    },
    followButton: {
        backgroundColor: "#e2ddd0",
        padding: 5,
        color: "white",
        marginRight: 10
    },
    publishFirst: {
        padding: 10,
        color: "black",
        marginTop: 20,
        backgroundColor: "#e2ddd0",
        textAlign: "left",
        fontSize: 20
    }
        
})

module.exports = styles;
module.exports.constants = constants;





