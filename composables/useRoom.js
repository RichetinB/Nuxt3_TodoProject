export default () => {



    const getRoom = async () => {
        try {
          const data = await useFetchApi('/api/rooms/room');
          return data.room; 
        } catch (error) {
          throw new Error('Failed to fetch room data');
        }
      };
    return {
        getRoom
    }

}