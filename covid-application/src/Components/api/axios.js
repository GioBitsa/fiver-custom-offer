import axios from 'axios';

//base url for the full application
//development backend will be run on the port 8000
export default axios.create({
    baseURL: 'https://soen390-team18-covidwebapp.azurewebsites.net/'
    // baseURL: 'http://localhost:8000'
});