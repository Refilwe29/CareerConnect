import apiClient from './apiClient';

export const createStudent = async (studentData) => {
    try {
        const response = await apiClient.post('/student/create', studentData);
        return response.data;
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
};

export const getAllStudents = async () => {
    try {
        const response = await apiClient.get('/students/getAll');
        return response.data;
    } catch (error) {
        console.error("Error getting students:", error);
        throw error;
    }
}