import axios from 'axios';

export async function sendDataToBackend(formData) {

    try {
        const response = await axios.post('http://hh.autodrive-agency.ru/testtasks/front/task-7/', {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city_id: formData.cityId
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}