import axios from "axios";

export default {
    signup: function(newUser) {
        return axios.post("api/users/signup", newUser);
    },

    login: function(user) {
        return axios.post("api/users/login", user);
    },

    isAuthenticated: function (id) {
        return axios.get(`api/users/${id}`);
    },

    findAllUsers: function() {
        return axios.get('../api/users');
    },
    

    updateUsers: function(id,obj) {
        return axios.put(`../api/users/update/${id}`,obj);
    }





};
