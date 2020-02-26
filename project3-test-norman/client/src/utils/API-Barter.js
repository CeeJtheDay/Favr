import axios from "axios";

export default {
    create : function(item){
        return axios.post(`/api/barters`,item);
    },

    findAll : function () {
        return axios.get(`/api/barters`);
    },

    remove: function(id) {
        return axios.delete(`/api/baters/${id}`);
    },

};
