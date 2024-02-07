export default {
    actions: {},
    state: {
        popupApplication: false,
        popupReport: false,
        report: '',
        name: '',
        phone: '+7',
        email: '',
        cityId: '',
        errors: {
            name: '',
            phone: '',
            email: '',
        },
        citySelect: [
            { id: 1, name: "Москва" },
            { id: 2, name: "Санкт-Петербург" },
            { id: 3, name: "Казань" }
        ]
    },
    mutations: {
        setPopupApplication(state, value) {
            state.popupApplication = value;
        },
        setPopupReport(state, value) {
            state.popupReport = value;
        },
        setReport(state, value) {
            state.report = value;
        },
        setName(state, value) {
            state.name = value;
        },
        setPhone(state, value) {
            state.phone = value;
        },
        setEmail(state, value) {
            state.email = value;
        },
        setCityId(state, value) {
            state.cityId = value;
        },
        setErrors(state, value) {
            state.errors = value;
        }
    },
    getters: {
        allPosts(state){
            return state.posts;
        }
    },
}