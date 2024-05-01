export default () => {

  const fetchUserRooms = async () => {
    try {
        const response = await useFetchApi('/api/rooms/users_room');
        return await response.json();
    } catch (error) {
        throw new Error('Error fetching user rooms: ' + error.message);
    }
};

    return {
        fetchUserRooms
    }

}