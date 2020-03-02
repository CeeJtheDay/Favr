import axios from "axios";

export default {
    create: function(newReview) {
        console.log(newReview);
        return axios.post("api/reviews", newReview);
    },

};
